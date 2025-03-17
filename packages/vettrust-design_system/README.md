# @somethingcreative-agency/vettrust-design_system

> Core components of the vettrust system

[![NPM](https://img.shields.io/npm/v/@somethingcreative-agency/vettrust-design_system.svg)](https://www.npmjs.com/package/@somethingcreative-agency/vettrust-design_system) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @somethingcreative-agency/vettrust-design_system
```

## Usage

```tsx
import React, { Component } from "react";

import { MyComponent } from "@somethingcreative-agency/vettrust-design_system";
import "@somethingcreative-agency/vettrust-design_system/dist/index.css";

class Example extends Component {
  render() {
    return <MyComponent />;
  }
}
```

## Development

- [microbundle-crl](https://www.npmjs.com/package/microbundle-crl) is used to bundle the components.

> NOTE: For some reason the --watch option does not seem to work so there is room for improvement there

 <br>

- before pushing for release, run `yarn changelog` to create a new version
- There is an automated CI that publishes the package to the npm registry on every successful merge onto the main branch

## License

MIT © [@somethingcreative-agency](https://github.com/somethingcreative-agency)
