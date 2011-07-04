<?php
// $Id$

/**
 * @file
 * ....
 */

function _sjamayee_type_resource_definition() {
  return array(
    'type' => array(
      'retrieve' => array(
        'help' => 'Retrieves a type',
        'callback' => '_sjamayee_type_resource_type',
        'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_type_resource'),
        'access callback' => '_sjamayee_type_resource_access',
        'access arguments' => array('view'),
        'access arguments append' => TRUE,
        'args' => array(
          array(
            'name' => 'id',
            'type' => 'int',
            'description' => 'The id of the type to get',
            'source' => array('path' => '0'),
            'optional' => FALSE,
          ),
        ),
      ),
      'index' => array(
        'help' => 'Retrieves a listing of types',
        'callback' => '_sjamayee_type_resource_index',
        'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_type_resource'),
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

function sjamayee_type_resource_perm() {
  return array(
    //'type resource view any type',
    'type resource view own types',
  );
}

function _sjamayee_type_resource_index($page, $parameters) {
  return db_query("SELECT * FROM {sja_types}")->fetchAll();
}

function _sjamayee_type_resource_type($id) {
  return db_query("SELECT * FROM {sja_types} WHERE id = :id", array(':id' => $id))->fetchObject();
}

function _sjamayee_type_resource_access($op, $args) {
  global $user;
  $access = FALSE;
  switch ($op) {
    case 'view':
      //$type = _sjamayee_type_resource_type($args[0]);
      $access = user_access('type resource view any type');
      //$access = $access || $type->id == $user->uid && user_access('type resource view own types');
      break;
  }
  return $access; //TRUE; //FALSE; //$access;            // !!!!!!!!!!!!!!!!!!!!!!! NOK !!!!!!!!!!!!!!!!!!!!!!!
}

function sjamayee_type_resource_schema() {
  $schema = array();
  $schema['sja_types'] = array(
    'description' => 'Sjamayee types',
    'fields' => array(
      'id' => array(
        'type'        => 'serial',
        'description' => 'Primary ID',
        'unsigned'    => TRUE,
        'not null'    => TRUE,
        'no export'   => TRUE,
      ),
      'type' => array(
        'description' => 'Type',
        'type'        => 'varchar',
        'length'      => 32,
        'not null'    => TRUE,
      ),
       'code' => array(
        'description' => 'Code',
        'type'        => 'char',
        'length'      => 4,
        'not null'    => TRUE,
      ),
      'name' => array(
        'description' => 'Name',
        'type'        => 'varchar',
        'length'      => 255,
        'not null'    => TRUE,
      ),
      'version' => array(
        'description' => 'Version',
        'type'        => 'int',
        'size'        => 'small',
        'not null'    => TRUE,
      ),
      'description' => array(
        'description' => 'Description',
        'type'        => 'text',
        'size'        => 'medium',
        'not null'    => FALSE,
      ),
      'in_use' => array(
        'description' => 'In use',
        'type'        => 'char',
        'length'      => 1,
        'default'      => 'Y',
        'not null'    => TRUE,
      ),
      'object' => array(
        'description' => 'Object',
        'type'        => 'varchar',
        'length'      => 255,
        'not null'    => FALSE,
      ),
      'cby_id' => array(
        'description' => 'Created by ID',
        'type'        => 'int',
        'unsigned'    => TRUE,
        'not null'    => TRUE,
      ),
      'mby_id' => array(
        'description' => 'Modified by ID',
        'type'        => 'int',
         'unsigned'    => TRUE,
         'not null'    => TRUE,
      ),
    ),
    'primary key' => array('id'),
  );
  return $schema;
}
/*
//Entity sjamayee_type.
function sjamayee_type_resource_entity_info() {
  return array(
    'sjamayee_type' => array(
      'label' => t('Sjamayee type'),
      'base table' => 'sja_types',
      'entity keys' => array(
        'id' => 'id',
      ),
    ),
  );
}*/