<?php
define('__ROOT__', dirname(__FILE__));
/**
 * Подключение файлов
 * @param string $file
 * @param string $folder
 * @param string $how - метод подключения
 * @return bool
 */
function get_file($file = '',$folder = '',$how = 'request_once')
{
    $dir = __ROOT__;

    if( !empty($folder) )
    {
        $dir .= '\\'.$folder;
    }

    if( empty($file) )
    {
        return false;
    }
    else
    {
        $dir .= '\\'.$file;
    }

    if( !file_exists($dir) )
    {
        return false;
    }

    switch( $folder )
    {
        case 'require_once':
            require_once($dir);
            break;
        case 'require':
            require($dir);
            break;
        case 'include':
            include($dir);
            break;
        case 'include_once':
            include_once($dir);
            break;
        default:
            return false;
            break;
    }

    echo $dir;

    return true;
}