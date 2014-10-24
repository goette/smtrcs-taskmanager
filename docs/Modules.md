# Module

## Description

Modules consist of different components or component groups. Each module has it's own store. Shared functionality across stores is achieved by requiring commonjs helper-modules. In the initial ajax call, the module fetches its data and renders accordingly. The user-rights are checked on the server. If the module/data is disallowed the ajax call returns some sort of forbidden status/param.

## Store

### Actions

* Specific actions for module, i.e. sort, check, delete, add

### Requires

* Shared helper modules, i.e. ajax-call, remove-me-from-page, toggle-checkbox


### Stores

* Data for view
* Editable/uneditable params
* Service call to server-side frontend
* Tags to define groups of modules

