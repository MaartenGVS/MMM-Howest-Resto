# MMM-Howest-Resto
Showing the weekly menu of a specific resto at Howest University of Applied Sciences
This module is an extension of the [MagicMirror² project](https://github.com/MichMich/MagicMirror).

## Screenshots
![Connections](https://github.com/Jan-Bart/MMM-NMBS-Connection/blob/master/screenshots/screenshot.png)

## Installation
1. Navigate into your MagicMirror's modules folder
2. Execute: `git clone https://github.com/MaartenGVS/MMM-Howest-Resto`
3. Add [config](https://github.com/MaartenGVS/MMM-Howest-Resto#configuration)
4. Done


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

| Key                 | Description                                    | Default         | Example         |
| ------------------- |------------------------------------------------|:---------------:|:---------------:|
| resto                | Departure stationname or ID                    | RSS1             'GKG', 'PENTA', 'RSS', 'RSS1', 'SIC', 'SJS', 'TS'



## Report bugs
You can report bugs here: [https://github.com/Jan-Bart/MMM-NMBS-Connection/issues](https://github.com/Jan-Bart/MMM-NMBS-Connection/issues)
