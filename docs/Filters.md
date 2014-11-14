# Filters (Draft 1)

## Description

There are two kinds of filters: Module filters and page filters.

### Module filters

Each module exposes the parameters it can be filtered by in its configuration. This works very similar to roles. Every module has its set of filter parameters, no matter if the corresponding filter ui element is visible or not. This makes it possible for a page filter to influence the module, without the need for displaying the filter element on the screen. If the filter element is supposed to be visible, so the user can use it, this can be enabled by the page store, which keeps track of the modules on the page and their corresponding state.

Functionally a module filter just re-triggers an ajax call to the action with the given filter parameter.

### Page filters

Page filters are dynamically populated by the modules and their corresponding filter parameters on the page. They are a specific module themselves with their own store, which needs to wait for the page store before being initialized. The filter store then loops over the modules on the page and collects all filter parameters. This is depending on the current role, so a page filter is able to transform with the modules for different roles.

The page filter needs its own action to fetch the available options initially, for example "search engines of current project" dynamically, so the original plan to keep it "dumb" is not possible.


