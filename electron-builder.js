const git = require("git-rev-sync");

module.exports = () => {
	const version = process.env.PR_BUILD ? git.short(".") : "${version}";
	return {
		appId: "com.philipf5.sg-dial-sim",
		productName: "SG Dial Sim",
		artifactName: `\${productName} ${version}-\${os}.\${ext}`,
		afterSign: "notarize.js",
		directories: {
			output: "electron-build",
		},
		files: ["dist/", "main.js", "package.json"],
		mac: {
			artifactName: "${productName} ${version}-${os}-${arch}.${ext}",
			category: "public.app-category.games",
			entitlements: "build/entitlements.mac.plist",
			entitlementsInherit: "build/entitlements.mac.plist",
			gatekeeperAssess: false,
			hardenedRuntime: true,
			target: "dmg",
		},
		win: {
			target: "portable",
		},
		dmg: {
			sign: false,
		},
	};
};
