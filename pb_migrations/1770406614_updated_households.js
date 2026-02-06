/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_households")

  // update collection data
  unmarshal({
    "createRule": "household_members_via_household.user.id = @request.auth.id",
    "deleteRule": "household_members_via_household.user.id = @request.auth.id",
    "listRule": "household_members_via_household.user.id = @request.auth.id",
    "updateRule": "household_members_via_household.user.id = @request.auth.id",
    "viewRule": "household_members_via_household.user.id = @request.auth.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_households")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
