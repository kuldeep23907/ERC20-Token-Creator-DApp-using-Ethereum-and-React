const path = require("path");
var HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();
var mnemonic =
	"track urban song body clarify alarm firm bike guard agent small around" ||
	process.env.MNEMONIC;
var apiKey =
	"https://rinkeby.infura.io/v3/76572308a2714058a90cddf49b651930" ||
	process.env.API_KEY;

module.exports = {
	// See <http://truffleframework.com/docs/advanced/configuration>
	// to customize your Truffle configuration!
	contracts_build_directory: path.join(__dirname, "client/src/contracts"),
	networks: {
		development: {
			host: "127.0.0.1",
			port: 7545,
			network_id: "*",
		},
		rinkeby: {
			provider: new HDWalletProvider(mnemonic, apiKey),
			network_id: 4,
			// networkCheckTimeout: 10
			gas: 4500000,
			gasPrice: 10000000000,
		},
	},
	compilers: {
		solc: {
			version: "0.6.10",
			// optimizer: {
			//   enabled: true,
			//   runs: 1000
			// },
			// evmVersion: "homestead"
		},
	},
};
