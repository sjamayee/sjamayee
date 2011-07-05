<?php
// $Id$

/**
 * @file
 * ....
 */

function _sjamayee_attribute_resource_definition() {
  return array(
    'attribute' => array(
      'retrieve' => array(
        'help' => 'Retrieves an attribute',
        'callback' => '_sjamayee_attribute_resource_attribute',
        'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_attribute_resource'),
        'access callback' => '_sjamayee_attribute_resource_access',
        'access arguments' => array('view'),
        'access arguments append' => TRUE,
        'args' => array(
          array(
            'name' => 'id',
            'type' => 'int',
            'description' => 'The id of the attribute to get',
            'source' => array('path' => '0'),
            'optional' => FALSE,
          ),
        ),
      ),
      'index' => array(
        'help' => 'Retrieves a listing of attributes',
        'callback' => '_sjamayee_attribute_resource_index',
        'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_attribute_resource'),
        'access callback' => 'user_access',
        'access arguments' => array('access content'),
        'access arguments append' => FALSE,
        'args' => array(array(
            'name' => 'page',
            'type' => 'int',
            'description' => '',
            'source' => array(
              'params' => 'page',
            ),
            'optional' => TRUE,
            'default value' => 0,
          ),
          array(
            'name' => 'parameters',
            'type' => 'array',
            'description' => '',
            'source' => 'param',
            'optional' => TRUE,
            'default value' => array(),
          ),
        ),
      ),
    ),
  );
}

function _sjamayee_attribute_resource_index($page, $parameters) {
  return db_query("SELECT * FROM {sja_attributes}")->fetchAll();
}

function _sjamayee_attribute_resource_attribute($id) {
  return db_query("SELECT * FROM {sja_attributes} WHERE id = :id", array(':id' => $id))->fetchObject();
}

function _sjamayee_attribute_resource_access($op, $args) {
  global $user;
  $access = FALSE;
  switch ($op) {
    case 'view':
      //$type = _sjamayee_attribute_resource_attribute($args[0]);
      $access = user_access('attribute_resource view any attribute');
      //$access = $access || $type->id == $user->uid && user_access('attribute_resource view own attributes');
      break;
  }
  return TRUE; //FALSE; //$access;            // !!!!!!!!!!!!!!!!!!!!!!! NOK !!!!!!!!!!!!!!!!!!!!!!!
}

function sjamayee_attribute_resource_schema() {
  $schema = array();
  $schema['sja_attributes'] = array(
    'description' => 'Sjamayee attributes',
    'fields' => array(
      'id' => array(
        'description' => 'Primary ID',
        'type'        => 'varchar',
        'length'      => 255,
        'not null'    => TRUE,
        'no export'   => TRUE,
      ),
      'ver' => array(
        'description' => 'Version',
        'type'        => 'int',
        'size'        => 'small',
        'not null'    => TRUE,
        'default'     => 0,
      ),
      'name' => array(
        'description' => 'Name',
        'type'        => 'varchar',
        'length'      => 255,
        'default'     => NULL,
      ),
      'value' => array(
        'description' => 'Value',
        'type'        => 'varchar',
        'length'      => 255,
        'default'     => NULL,
      ),
      'mai' => array(
        'description' => 'Model attribute ID',
        'type'        => 'varchar',
        'length'      => 255,
        'default'     => NULL,
      ),
      'eid' => array(
        'description' => 'Entity ID',
        'type'        => 'varchar',
        'length'      => 255,
        'not null'    => TRUE,
      ),
      'default_value' => array(
        'description' => 'Default value',
        'type'        => 'varchar',
        'length'      => 255,
        'default'     => NULL,
      ),
      'description' => array(
        'description' => 'Description',
        'type'        => 'varchar',
        'length'      => 255,
        'default'     => NULL,
      ),
      'digits' => array(
        'description' => 'Digits',
        'type'        => 'int',
        'size'        => 'small',
        'default'     => NULL,
      ),
      'format' => array(
        'description' => 'Format',
        'type'        => 'varchar',
        'length'      => 255,
        'default'     => NULL,
      ),
      'hxi' => array(
        'description' => 'Help text ID',
        'type'        => 'varchar',
        'length'      => 255,
        'default'     => NULL,
      ),
      'identifier' => array(
        'description' => 'Identifier flag',
        'type'        => 'char',
        'length'      => 1,
        'not null'    => TRUE,
        'default'     => 'N',
      ),
      'label' => array(
        'description' => 'Label',
        'type'        => 'varchar',
        'length'      => 255,
        'default'     => NULL,
      ),
      'length' => array(
        'description' => 'Length',
        'type'        => 'int',
        'size'        => 'small',
        'not null'    => TRUE,
        'default'     => 0,
      ),
      'mandatory' => array(
        'description' => 'Mandatory',
        'type'        => 'char',
        'length'      => 1,
        'not null'    => TRUE,
        'default'     => 'N',
      ),
      'nid' => array(
        'description' => 'Next ID',
        'type'        => 'varchar',
        'length'      => 255,
        'default'     => NULL,
      ),
      'precision' => array(
        'description' => 'Precision',
        'type'        => 'int',
        'size'        => 'small',
        'not null'    => TRUE,
        'default'     => 0,
      ),
      'scale' => array(
        'description' => 'Scale',
        'type'        => 'int',
        'size'        => 'small',
        'not null'    => TRUE,
        'default'     => 0,
      ),
      'txi' => array(
        'description' => 'Text ID',
        'type'        => 'varchar',
        'length'      => 255,
        'default'     => NULL,
      ),
      'type' => array(
        'description' => 'Type',
        'type'        => 'varchar',
        'length'      => 32,
        'not null'    => TRUE,
        'default'     => 'Text',
      ),
      'unique' => array(
        'description' => 'Unique',
        'type'        => 'char',
        'length'      => 1,
        'not null'    => TRUE,
        'default'     => 'N',
      ),
/*
      'cbi' => array(
        'description' => 'Created by ID',
        'type'        => 'varchar',
        'length'      => 255,
        'not null'    => TRUE,
      ),
      'cat' => array(
        'description' => 'Created at',
        'type'        => 'timestamp',
        'not null'    => TRUE,
        'default'     => current_timestamp,
      ),
      'mbi' => array(
        'description' => 'Modified by ID',
        'type'        => 'varchar',
        'length'      => 255,
         'not null'    => TRUE,
      ),
      'mat' => array(
        'description' => 'Modified at',
        'type'        => 'timestamp',
        'not null'    => TRUE,
        'default'     => current_timestamp,
       )*/
    ),
    'primary key' => array('id'),
  );
  return $schema;
}
