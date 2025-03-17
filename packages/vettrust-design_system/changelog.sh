new_version="1.0.1-alpha.$(date +%s)"
awk -v ver="$new_version" '{if ($1 == "\"version\":") { print "  \"version\": \""ver"\"," } else { print $0 } }' package.json > package.json.tmp && mv package.json.tmp package.json
auto-changelog -p
