(function() {
	// const db_info = {url:'localhost',
    //                     username: 'webuser',
    //                     password: 'webuser',
    //                     port: '24552',
	// 					database: 'mainDatabase',
    //                     collection: 'createRuns',
    //                     users: 'users'
    //                 };
    const db_info = {
        url: `mongodb+srv://emmahorton03:wc8zzJKOdmpMDxE1@reunify.50cg9.mongodb.net/?retryWrites=true&w=majority&appName=reunify`,
        database: 'mainDatabase',
        collection: 'createRuns',
        users: 'users'
    };

	const moduleExports = db_info;

    if (typeof __dirname != 'undefined')
        module.exports = moduleExports;
}());

