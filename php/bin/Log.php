<?php
/**
 * Ведение ошибок
 */
class Log
{
    // Хранилище ошибок
    private static $store = array();
    // Переключатель вывода ошибок
    private static $display = false;
    // Тип вывода ошибки
    private static $type = 'json';

    // Получение ошибок
    public static function getStore()
    {
        return self::$store;
    }

    // Установка ошибки
    public static function setStore($num = '', $subject='', $text='')
    {
        $store = array('num'=>$num,'subject'=>$subject,'text'=>$text);
        self::$store = array_push(self::$store,$store);

        if(self::$display)
        {
            self::viewError($store);
        }
    }

    // Установка переключателя
    public function setDisplay($display)
    {
        self::$display = (Boolean) $display;
    }

    // Вывод ошибки
    public static function viewError($error = array())
    {
        $errorStr = '';
        switch(self::$type)
        {
            case 'json':
                $errorStr = json_encode($error);
                break;
            default:
                $errorStr = implode(', ',$error);
                break;
        }
        exit($errorStr);
    }
}
