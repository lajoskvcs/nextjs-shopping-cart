module.exports = {
	plugins: ['@dwmt/commitlint-plugin-github-type'],
	extends: ['@dwmt/commitlint-config-github-type'],
	rules: {
		// 2 sets the level of this rule to error.
		// always means that this rule should be applied as is
		// (the other value is "never", which inverts the rule)
		'header-max-length': [2, 'always', 120],
	},
}
