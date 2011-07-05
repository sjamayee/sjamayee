<?php
// $Id$

/**
 * @file
 * ....
 */

function _sjamayee_reference_resource_definition() {
  return array(
    'reference' => array(
      'retrieve' => array(
        'help' => 'Retrieves a reference',
        'callback' => '_sjamayee_reference_resource_reference',
        'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_reference_resource'),
        'access callback' => '_sjamayee_reference_resource_access',
        'access arguments' => array('view'),
        'access arguments append' => TRUE,
        'args' => array(
          array(
            'name' => 'id',
            'type' => 'int',
            'description' => 'The id of the reference to get',
            'source' => array('path' => '0'),
            'optional' => FALSE,
          ),
        ),
      ),
      'index' => array(
        'help' => 'Retrieves a listing of references',
        'callback' => '_sjamayee_reference_resource_index',
        'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_reference_resource'),
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

function _sjamayee_reference_resource_index($page, $parameters) {
  return db_query("SELECT * FROM {sja_references}")->fetchAll();
}

function _sjamayee_reference_resource_reference($id) {
  return db_query("SELECT * FROM {sja_references} WHERE id = :id", array(':id' => $id))->fetchObject();
}

function _sjamayee_reference_resource_access($op, $args) {
  global $user;
  $access = FALSE;
  switch ($op) {
    case 'view':
      //$type = _sjamayee_reference_resource_reference($args[0]);
      $access = user_access('reference resource view any reference');
      //$access = $access || $type->id == $user->uid && user_access('reference resource view own references');
      break;
  }
  return TRUE; //FALSE; //$access;            // !!!!!!!!!!!!!!!!!!!!!!! NOK !!!!!!!!!!!!!!!!!!!!!!!
}

function sjamayee_reference_resource_schema() {
  $schema = array();
  $schema['sja_references'] = array(
    'description' => 'Sjamayee references',
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
      'mri' => array(
        'description' => 'Model reference ID',
        'type'        => 'varchar',
        'length'      => 255,
        'default'     => NULL,
      ),
      'pei' => array(
        'description' => 'Parent object ID',
        'type'        => 'varchar',
        'length'      => 255,
        'default'     => NULL,
      ),
      'cei' => array(
        'description' => 'Child object ID',
        'type'        => 'varchar',
        'length'      => 255,
        'default'     => NULL,
      ),
      'pid' => array(
        'description' => 'Previous ID',
        'type'        => 'varchar',
        'length'      => 255,
        'default'     => NULL,
      ),
      'nid' => array(
        'description' => 'Next ID',
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
