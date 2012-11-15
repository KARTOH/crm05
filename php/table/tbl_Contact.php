<?php
class tbl_Contact
{
    public $columns = array(
        'Id',
        'Name',
        'Number'
    );
    public $join = array();
    public $set = array();
    public $execute = array();
    public $table = 'tbl_Contact';
    public $isNew = false;

    private function addQuotes($string)
    {
        if(strpos($string,'.') === false)
        {
            $string = $this->table.'.'.$string;
        }
        $string = '`'.str_replace('.','`.`',$string).'`';
        $string = str_replace(' AS ','` AS `',$string);

        return $string;
    }

    public function addColumn($name = '')
    {
        $this->columns = array_push($this->columns,(String) $name);
    }

    public function setValue($column = null, $value = '')
    {
        if($column === null)
        {
            //todo
        }

        if(!in_array($column,$this->columns))
        {
            //todo
        }

        $this->set = array_push($this->set,array('column'=>$column,'value'=>$value));
    }

    public function save()
    {

    }
}
