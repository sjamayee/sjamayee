Sjamayee datamodel.
-------------------

I would like to use these short fieldnames, to have a minimal overhead in JSON transport.

Primary key: id              Values (GUID,SHA1,URI) 

Foreign keys:                Datasets
------------------------------------------------------------------------------
cei: child_entity_id      -> model_entities/data_entities
eid: entity_id            -> model_entities/data_entities
hxi: help_text_id         -> texts
mai: model_attribute_id   -> model_attributes
mei: model_entity_id      -> model_entities
mri: model_relation_id    -> model_relations
nid: next_id              -> same dataset (texts,model_attributes,model_relations,data_relations)
oid: object_id            -> OBJECT_ID in target (Drupal,Salesforce,Git,SAP,...)
pei: parent_entity_id     -> model_entities/data_entities
pid: previous_id          -> same dataset (texts,model_relations,data_relations)
tid: type_id              -> types
txi: text_id              -> texts
exi: entended_entity_id   -> model_entities (entity extends entity)

Other fieldnames             Values
---------------------------------------------------------------
cbi: created_by_id           To Be Defined (whatever).
cat: created_at              DateTime
mbi: modified_by_id          TBD
mat: modified_at             TimeStamp

Sjamayee browser, explorer, composer make different use of this datamodel.
--------------------------------------------------------------------------
1. As a browser:
The browser uses the minimal model:
For browsing of data from different data sources.

sequences				- sja_sequences
types						- sja_types
texts						- sja_texts
data_entities		- sja_objects
data_attributes	- sja_attributes
data_relations	- sja_references

The explorer and composer additionaly make use of the model_tables.

model_entities  - sja_objects
model_attrbutes	- sja_attributes
model_relations - sja_references

2. As an explorer:
The explorer uses the model only for the references and for a few
lightweight sjamayee entities/objects (HTML,MAP,DOC,PDF,NOTE,...).
Backed with these model_tables, the explorer can freely create instances of these objects and
reorder/regroup the explored data in maps and make notes, insert links and documents.

3. As a composer:
The composer will need a full model with model entities/objects defined with model texts.
So, in this mode, Sjamayee will become a model-driven composer.
