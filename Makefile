server:
		grunt server

fake-api:
		json-server --watch db/db.json --routes db/routes.json
