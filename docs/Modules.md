# Module

## Description

Modules consist of different components or component groups. Each module has it's own store. Shared functionality across stores is achieved by requiring commonjs helper-modules. In the initial ajax call, the module fetches its data and renders accordingly. The user-rights are checked on the server.

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

### Unique Modules

A unique module is a specific representation of a module, with it's own action, user-rights-handling, name, etc. The static module collection lists all these parameters for each unique module.
For example the unique module "Channels compared - historical" entry could look like this:
´´´
{
    id: 'ChannelsComparedHistorical', // the unique id
    type: 'AreaChart', // is a module type area chart
    roles: ['c','s'], // can be seen by user-roles c-type and seo
    action: 'traffic/channel-distribution', // server-side action that delivers the data
    defaultClass: 'col-md-12 col-lg-6' // it is always full width, on large screen half width only 
}
´´´
