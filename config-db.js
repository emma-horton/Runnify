(function() {
	const db_info = {url:'localhost',
                        username: 'webuser',
                        password: 'webuser',
                        port: '24552',
						database: 'mainDatabase',
                        collection: 'createRuns',
                        users: 'users'
                    };

	const moduleExports = db_info;

    if (typeof __dirname != 'undefined')
        module.exports = moduleExports;
}());

