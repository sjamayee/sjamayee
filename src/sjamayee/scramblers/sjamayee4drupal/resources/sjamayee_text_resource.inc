<?php
// $Id$

/**
 * @file
 * ....
 */

function _sjamayee_text_resource_definition() {
  return array(
    'text' => array(
      'retrieve' => array(
        'help' => 'Retrieves a text',
        'callback' => '_sjamayee_text_resource_text',
        'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_text_resource'),
        'access callback' => '_sjamayee_text_resource_access',
        'access arguments' => array('view'),
        'access arguments append' => TRUE,
        'args' => array(
          array(
            'name' => 'id',
            'type' => 'int',
            'description' => 'The id of the text to get',
            'source' => array('path' => '0'),
            'optional' => FALSE,
          ),
        ),
      ),
      'index' => array(
        'help' => 'Retrieves a listing of texts',
        'callback' => '_sjamayee_text_resource_index',
        'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_text_resource'),
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

function sjamayee_text_resource_perm() {
  return array(
    'text resource view any text',
    'text resource view own texts',
  );
}

function _sjamayee_text_resource_index($page, $parameters) {
  return db_query("SELECT * FROM {sja_texts}")->fetchAll();
}

function _sjamayee_text_resource_text($id) {
  return db_query("SELECT * FROM {sja_texts} WHERE id = :id", array(':id' => $id))->fetchObject();
}

function _sjamayee_text_resource_access($op, $args) {
  global $user;
  $access = FALSE;
  switch ($op) {
    case 'view':
      //$type = _sjamayee_text_resource_text($args[0]);
      $access = user_access('text resource view any text');
      //$access = $access || $type->id == $user->uid && user_access('text resource view own texts');
      break;
  }
  return TRUE; //FALSE; //$access;            // !!!!!!!!!!!!!!!!!!!!!!! NOK !!!!!!!!!!!!!!!!!!!!!!!
}

function sjamayee_text_resource_schema() {
  $schema = array();
  $schema['sja_texts'] = array(
    'description' => 'Sjamayee texts',
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
        'size'        => 255,
        'default'     => NULL,
      ),
      'nid' => array(
        'description' => 'Next ID',
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
      'par' => array(
        'description' => 'Paragraph',
        'type'        => 'char',
        'length'      => 8,
        'not null'    => TRUE,
        'default'     => '',
      ),
      'seq' => array(
        'description' => 'Sequence',
        'type'        => 'float',
        'size'        => 'big',
        'not null'    => TRUE,
        'default'     => 0,
      ),
      'text' => array(
        'description' => 'Text',
        'type'        => 'varchar',
        'length'      => 255,
        'not null'    => TRUE,
        'default'     => '',
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
