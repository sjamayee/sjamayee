<?php
// $Id$

/**
 * @file
 * ....
 */

function _sjamayee_object_resource_definition() {
  return array(
    'object' => array(
      'retrieve' => array(
        'help' => 'Retrieves an object',
        'callback' => '_sjamayee_object_resource_object',
        'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_object_resource'),
        'access callback' => '_sjamayee_object_resource_access',
        'access arguments' => array('view'),
        'access arguments append' => TRUE,
        'args' => array(
          array(
            'name' => 'id',
            'type' => 'int',
            'description' => 'The id of the object to get',
            'source' => array('path' => '0'),
            'optional' => FALSE,
          ),
        ),
      ),
      'index' => array(
        'help' => 'Retrieves a listing of objects',
        'callback' => '_sjamayee_object_resource_index',
        'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_object_resource'),
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

function _sjamayee_object_resource_index($page, $parameters) {
  return db_query("SELECT * FROM {sja_objects}")->fetchAll();
}

function _sjamayee_object_resource_object($id) {
  return db_query("SELECT * FROM {sja_objects} WHERE id = :id", array(':id' => $id))->fetchObject();
}

function _sjamayee_object_resource_access($op, $args) {
  global $user;
  $access = FALSE;
  switch ($op) {
    case 'view':
      //$type = _sjamayee_object_resource_object($args[0]);
      $access = user_access('object resource view any object');
      //$access = $access || $type->id == $user->uid && user_access('object resource view own objects');
      break;
  }
  return TRUE; //FALSE; //$access;            // !!!!!!!!!!!!!!!!!!!!!!! NOK !!!!!!!!!!!!!!!!!!!!!!!
}

function sjamayee_object_resource_schema() {
  $schema = array();
  $schema['sja_objects'] = array(
    'description' => 'Sjamayee objects',
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
      'description' => array(
        'description' => 'Description',
        'type'        => 'text',
        'size'        => 'medium',
        'not null'    => FALSE,
      ),
      'tid' => array(
        'description' => 'Type ID',
        'type'        => 'varchar',
        'length'      => 255,
        'not null'    => TRUE,
      ),
      'exi' => array(
        'description' => 'Extends ID',
        'type'        => 'varchar',
        'length'      => 255,
        'default'     => NULL,
      ),
      'mei' => array(
        'description' => 'Model object ID',
        'type'        => 'varchar',
        'length'      => 255,
        'default'     => NULL,
      ),
      'oid' => array(
        'description' => 'Object ID',
        'type'        => 'varchar',
        'length'      => 255,
        'default'     => NULL,
      ),
      'txi' => array(
        'description' => 'Text ID',
        'type'        => 'varchar',
        'length'      => 255,
        'default'     => NULL,
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
