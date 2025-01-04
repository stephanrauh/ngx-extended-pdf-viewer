import { Component } from '@angular/core';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';

@Component({
  selector: 'pvs-troubleshooting-page',
  standalone: true,
  imports: [ContentPageComponent, MarkdownContentComponent],
  template: `
    <pvs-content-page> <pvs-markdown src="/assets/pages/about/troubleshooting/text.md" /> </pvs-content-page>
    <h2>Maximum resolutions</h2>
    <p>
      Several users reported problems with huge images. Sometimes this is difficult to regognize: good image compression means a small PDF file can contains an
      image with very high resolution.
    </p>
    <p>
      The PDF viewer renders every pages as a canvas. Browsers can't create arbitrary large canvases. ngx-extended-pdf-viewer automatically reduces the
      resolution if necessary. You can also influence the resolution yourself. In the browser, it's determined by the attribute <code>[(zoom)]</code> and in
      print it's determined by \`[printResolution]\`.
    </p>
    <p>
      According to <a href="https://www.npmjs.com/package/canvas-size#test-results">the documentation of the canvas-size project,</a> these are the maximum
      canvas sizes:
    </p>
    <h3>Desktop</h3>
    <table>
      <thead>
        <tr>
          <th>Browser (OS)</th>
          <th style="text-align: right">Max Width</th>
          <th style="text-align: right">Max Height</th>
          <th style="text-align: right">Max Area (Total)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Chrome 83 (Mac, Win *)</td>
          <td style="text-align: right">65,535</td>
          <td style="text-align: right">65,535</td>
          <td style="text-align: right">16,384 x 16,384 (268,435,456)</td>
        </tr>
        <tr>
          <td>Chrome 70 (Mac, Win *)</td>
          <td style="text-align: right">32,767</td>
          <td style="text-align: right">32,767</td>
          <td style="text-align: right">16,384 x 16,384 (268,435,456)</td>
        </tr>
        <tr>
          <td>Edge 17 *</td>
          <td style="text-align: right">16,384</td>
          <td style="text-align: right">16,384</td>
          <td style="text-align: right">16,384 x 16,384 (268,435,456)</td>
        </tr>
        <tr>
          <td>Firefox 63 (Mac, Win *)</td>
          <td style="text-align: right">32,767</td>
          <td style="text-align: right">32,767</td>
          <td style="text-align: right">11,180 x 11,180 (124,992,400)</td>
        </tr>
        <tr>
          <td>IE 11 *</td>
          <td style="text-align: right">16,384</td>
          <td style="text-align: right">16,384</td>
          <td style="text-align: right">8,192 x 8,192 (67,108,864)</td>
        </tr>
        <tr>
          <td>IE 9 - 10 *</td>
          <td style="text-align: right">8,192</td>
          <td style="text-align: right">8,192</td>
          <td style="text-align: right">8,192 x 8,192 (67,108,864)</td>
        </tr>
        <tr>
          <td>Safari 7 - 12</td>
          <td style="text-align: right">4,194,303</td>
          <td style="text-align: right">8,388,607</td>
          <td style="text-align: right">16,384 x 16,384 (268,435,456)</td>
        </tr>
      </tbody>
    </table>
    <h3>Mobile</h3>
    <table>
      <thead>
        <tr>
          <th>Browser (OS)</th>
          <th style="text-align: right">Max Width</th>
          <th style="text-align: right">Max Height</th>
          <th style="text-align: right">Max Area (Total)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Chrome 68 (Android 9) *</td>
          <td style="text-align: right">32,767</td>
          <td style="text-align: right">32,767</td>
          <td style="text-align: right">14,188 x 14,188 (201,299,344)</td>
        </tr>
        <tr>
          <td>Chrome 68 (Android 7.1 - 8) *</td>
          <td style="text-align: right">32,767</td>
          <td style="text-align: right">32,767</td>
          <td style="text-align: right">14,188 x 14,188 (201,299,344)</td>
        </tr>
        <tr>
          <td>Chrome 68 (Android 6)</td>
          <td style="text-align: right">32,767</td>
          <td style="text-align: right">32,767</td>
          <td style="text-align: right">10,836 x 10,836 (117,418,896)</td>
        </tr>
        <tr>
          <td>Chrome 68 (Android 5) *</td>
          <td style="text-align: right">32,767</td>
          <td style="text-align: right">32,767</td>
          <td style="text-align: right">11,402 x 11,402 (130,005,604)</td>
        </tr>
        <tr>
          <td>Chrome 68 (Android 4.4) *</td>
          <td style="text-align: right">32,767</td>
          <td style="text-align: right">32,767</td>
          <td style="text-align: right">16,384 x 16,384 (268,435,456)</td>
        </tr>
        <tr>
          <td>IE (Windows Phone 8.x)</td>
          <td style="text-align: right">4,096</td>
          <td style="text-align: right">4,096</td>
          <td style="text-align: right">4,096 x 4,096 (16,777,216)</td>
        </tr>
        <tr>
          <td>Safari (iOS 9 - 12)</td>
          <td style="text-align: right">4,194,303</td>
          <td style="text-align: right">8,388,607</td>
          <td style="text-align: right">4,096 x 4,096 (16,777,216)</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class TroubleshootingPageComponent {}
