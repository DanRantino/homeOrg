/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2602490748")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_mfsJW9x0Hu` ON `tasks` (\n  `status`,\n  `household`\n)"
    ]
  }, collection)

  // remove field
  collection.fields.removeById("text2975291512")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2602490748")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_mfsJW9x0Hu` ON `tasks` (\n  `status`,\n  `houseId`\n)"
    ]
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2975291512",
    "max": 0,
    "min": 0,
    "name": "houseId",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
