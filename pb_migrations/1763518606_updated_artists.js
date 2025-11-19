/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2974007423")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_email_i51ltmv8gf` ON `artists` (`email`) WHERE `email` != ''",
      "CREATE UNIQUE INDEX `idx_tokenKey_pbc_2974007423` ON `artists` (`tokenKey`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2974007423")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_tokenKey_i51ltmv8gf` ON `artists` (`tokenKey`)",
      "CREATE UNIQUE INDEX `idx_email_i51ltmv8gf` ON `artists` (`email`) WHERE `email` != ''"
    ]
  }, collection)

  return app.save(collection)
})
