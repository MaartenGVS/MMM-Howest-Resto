# MMM-Howest-Resto
Showing the weekly menu of a specific resto at Howest University of Applied Sciences

This module is an extension of the [MagicMirror² project](https://github.com/MichMich/MagicMirror).

## Screenshot
![Howest Resto Screenshot](./screenshots/img.png)

## Installation
1. Navigate into your MagicMirror's modules folder
2. Execute: `git clone https://github.com/MaartenGVS/MMM-Howest-Resto`
3. Navigate to the MMM-Howest-Resto directory: cd MMM-Howest-Resto`
4. Install the dependencies: npm install
5. Add [config](https://github.com/MaartenGVS/MMM-Howest-Resto#configuration)
6. Done


## Configuration
Sample configuration entry for your `~/MagicMirror/config/config.js`:

```
{
  module: "MMM-Howest-Resto",
  position: "bottom_left",
  config: {
    resto: "RSS1"
  }
},
```


## Configuration options

The following properties can be configured:

| Key   | Description                                 | Default |                      Example                      |
|-------|---------------------------------------------|:-------:|:-------------------------------------------------:|
| resto | The abbreviation of a specific Howest resto |  RSS1   | 'GKG', 'PENTA', 'RSS', 'RSS1', 'SIC', 'SJS', 'TS' |

## Report bugs
You can report bugs here: [https://github.com/MaartenGVS/MMM-Howest-Resto/issues](https://github.com/MaartenGVS/MMM-Howest-Resto/issues)
