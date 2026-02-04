/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2602490748")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_mfsJW9x0Hu` ON `tasks` (\n  `status`,\n  `houseId`\n)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2602490748")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
