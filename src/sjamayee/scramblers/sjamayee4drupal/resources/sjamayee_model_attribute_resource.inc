<?php
// $Id$

/**
 * @file
 * ....
 */

function _sjamayee_model_attribute_resource_definition() {
  return array(
    'model_attribute' => array(
      'retrieve' => array(
        'help' => 'Retrieves a model attribute',
        'callback' => '_sjamayee_model_attribute_resource_attribute',
        'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_model_attribute_resource'),
        'access callback' => '_sjamayee_model_attribute_resource_access',
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
        'help' => 'Retrieves a listing of model attributes',
        'callback' => '_sjamayee_model_attribute_resource_index',
        'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_model_attribute_resource'),
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

function _sjamayee_model_attribute_resource_index($page, $parameters) {
  return db_query("SELECT * FROM {sja_model_attributes}")->fetchAll();
}

function _sjamayee_model_attribute_resource_attribute($id) {
  return db_query("SELECT * FROM {sja_model_attributes} WHERE id = :id", array(':id' => $id))->fetchObject();
}

function _sjamayee_model_attribute_resource_access($op, $args) {
  global $user;
  $access = FALSE;
  switch ($op) {
    case 'view':
      //$type = _sjamayee_model_attribute_resource_attribute($args[0]);
      $access = user_access('model_attribute resource view any attribute');
      //$access = $access || $type->id == $user->uid && user_access('model_attribute resource view own attributes');
      break;
  }
  return TRUE; //FALSE; //$access;            // !!!!!!!!!!!!!!!!!!!!!!! NOK !!!!!!!!!!!!!!!!!!!!!!!
}

function sjamayee_model_attribute_resource_schema() {
  $schema = array();
  $schema['sja_model_attributes'] = array(
    'description' => 'Sjamayee model attributes',
    'fields' => array(
      'id' => array(
        'type'        => 'serial',
        'description' => 'Primary ID',
        'unsigned'    => TRUE,
        'not null'    => TRUE,
        'no export'   => TRUE,
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
      'entity_id' => array(
        'description' => 'Entity ID',
        'type'        => 'int',
        'unsigned'    => TRUE,
        'not null'    => TRUE,
      ),
      'default_value' => array(
        'description' => 'Default value',
        'type'        => 'varchar',
        'length'      => 255,
        'default'      => '',
        'not null'    => TRUE,
      ),
      'description' => array(
        'description' => 'Description',
        'type'        => 'varchar',
        'length'      => 255,
        'default'      => '',
        'not null'    => TRUE,
      ),
      'digits' => array(
        'description' => 'Digits',
        'type'        => 'int',
        'size'        => 'small',
        'not null'    => TRUE,
      ),
      'format' => array(
        'description' => 'Format',
        'type'        => 'varchar',
        'length'      => 255,
        'default'      => '',
        'not null'    => TRUE,
      ),
      'help_text_id' => array(
        'description' => 'Help text ID',
        'type'        => 'int',
        'unsigned'    => TRUE,
        'not null'    => TRUE,
      ),
      'identifier' => array(
        'description' => 'Identifier flag',
        'type'        => 'char',
        'length'      => 1,
        'default'      => 'N',
        'not null'    => TRUE,
      ),
      'label' => array(
        'description' => 'Label',
        'type'        => 'varchar',
        'length'      => 255,
        'default'      => '',
        'not null'    => TRUE,
      ),
      'length' => array(
        'description' => 'Length',
        'type'        => 'int',
        'size'        => 'small',
        'default'      => 0,
        'not null'    => TRUE,
      ),
      'mandatory' => array(
        'description' => 'Mandatory',
        'type'        => 'char',
        'length'      => 1,
        'default'      => 'N',
        'not null'    => TRUE,
      ),
      'next_id' => array(
        'description' => 'Next ID',
        'type'        => 'int',
        'unsigned'    => TRUE,
        'not null'    => TRUE,
      ),
      'precision' => array(
        'description' => 'Precision',
        'type'        => 'int',
        'size'        => 'small',
        'default'      => 0,
        'not null'    => TRUE,
      ),
      'scale' => array(
        'description' => 'Scale',
        'type'        => 'int',
        'size'        => 'small',
        'default'      => 0,
        'not null'    => TRUE,
      ),
      'text_id' => array(
        'description' => 'Text ID',
        'type'        => 'int',
        'unsigned'    => TRUE,
        'not null'    => TRUE,
      ),
      'type' => array(
        'description' => 'Type',
        'type'        => 'varchar',
        'length'      => 255,
        'default'      => '',
        'not null'    => TRUE,
      ),
      'unique' => array(
        'description' => 'Unique',
        'type'        => 'char',
        'length'      => 1,
        'default'      => 'N',
        'not null'    => TRUE,
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
