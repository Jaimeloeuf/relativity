# relative-goto
Visual Studio Code extension "relative-goto" allows you to jump to lines relative to the current line. Recommended to use together with the relative line settings in VS code.

## Features
- Jumps up and down in the same editor using relative line numbers as shown by relative line settings in vs code.
    - Positive numbers to jump down
    - Negative numbers to jump up
- Keeps the current character number when jumping
- On extension activation, change settings to ensure that lines numbers settings uses relative lines.
- Scroll / shift visible range to new position if the new position is out of visible range or if new position is the 'scrollOff' region.

## Requirements
<!-- If you have any requirements or dependencies, add a section describing those and how to install and configure them. -->
-- NIL

## Extension Settings
Any VS Code settings through the `contributes.configuration` extension point.  
This extension contributes the following settings:
* `relative-goto.enable`: enable/disable this extension

## Known Issues
<!-- Calling out known issues can help limit users opening duplicate issues against your extension. -->
-- NIL --

## Roadmap
- [ ] Show highlight/preview of line on type before jumping to preview the jump destination
- [ ] Bundle project to reduce size
- [ ] Optimize import to only import what is needed from vs code lib
    - Use typings file for reference
    - e.g. use position.translate instead of creating a new position object
- [ ] Add settings to allow customization of jump style and default character position after jump

## Release Notes
### 0.3.2
- Bug fix for gotos jumping up, that exceeds upper document/screen limit of line 0
    - Previously, this will fail with an error of illegal position as a line cannot be negative.
    - Now, line will jump to the first line (line 0) and maintain the same character position if available.

### 0.3.1
- Bug fix for gotos when there is a text selection.
    - Previously, the jump used the "end" position of the text selection to jump, this is an issue when there is a bottom -> up text selection, as it will jump below the bottom selection.
    - Now, jump has been changed to use "active" position of selection as the anchor to jump, allowing true relative line number jumping based on current cursor position even if there is a text selection.

### 0.3.0
- Updated range scrolling to only scroll/shift if the new position is out of visible range or in the scrollOff region.

### 0.2.0
- Setup function to ensure line numbers settings uses relative line numbers.

### 0.1.0
Initial release.

---
## License, Author and Contributing
This project is developed and made available under the "MIT License". Feel free to use it however you like!  
If you have any questions, contact us via via at tech@enkeldigital.com  
Authors:
- [JJ](https://github.com/Jaimeloeuf)