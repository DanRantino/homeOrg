/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_tasks")

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_households",
    "hidden": false,
    "id": "relation1422077888",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "household",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_tasks")

  // remove field
  collection.fields.removeById("relation1422077888")

  return app.save(collection)
})
