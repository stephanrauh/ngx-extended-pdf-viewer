import { Component, inject } from '@angular/core';
import { FormDataType, NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SplitViewComponent } from '../../../shared/components/split-view.component';
import { SetMinifiedLibraryUsageDirective } from '../../../shared/directives/set-minified-library-usage.directive';
import { ContentPageComponent } from '../../../shared/components/content-page/content-page.component';
import { MarkdownContentComponent } from '../../../shared/components/markdown-content.component';
import { countries } from './countries';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';

@Component({
  selector: 'pvs-displaying-forms-page',
  standalone: true,
  imports: [
    ContentPageComponent,
    MarkdownContentComponent,
    NgxExtendedPdfViewerModule,
    SplitViewComponent,
    SetMinifiedLibraryUsageDirective,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `<pvs-content-page [demoTemplate]="demo">
    <pvs-markdown src="/assets/pages/forms/displaying-forms/text.md" />
    <ng-template #demo>
      <pvs-split-view [stickyEnd]="true">
        <p>
          <code>[(formData)]</code> links the fields in the PDF form with your Angular component. Note that <code>(formDataChange)</code> reports every filled
          input field of the PDF file, including fields you didn't send with <code>[formData]</code>.
        </p>
        <form [formGroup]="pdfForm">
          <fieldset class="fieldset">
            <legend>Personal Information</legend>
            <div class="input-group">
              <label for="first-name">First name</label>
              <input id="first-name" type="text" formControlName="firstName" />

              <label for="last-name">Last name</label>
              <input id="last-name" type="text" formControlName="lastName" />

              <label for="country">Country</label>
              <select id="country" formControlName="country">
                @for (country of countries; track country) {
                  <option [value]="country">{{ country }}</option>
                }
              </select>
            </div>
          </fieldset>

          <fieldset class="fieldset">
            <legend>Work Experience</legend>
            <div class="input-group">
              <label for="job-experience">Job experience (corner case!)</label>
              <input id="job-experience" type="text" formControlName="jobExperience" />

              <label for="databases">Databases</label>
              <select id="databases" formControlName="databases" multiple>
                <option value="oracle">Oracle</option>
                <option value="sqlServer">SQL Server</option>
                <option value="db2">DB2</option>
                <option value="postgreSQL">PostgreSQL</option>
              </select>

              <label for="other-experience">Other Job Experience</label>
              <textarea id="other-experience" rows="3" formControlName="otherJobExperience"></textarea>
            </div>
          </fieldset>

          <fieldset class="fieldset">
            <legend>Programming Skills</legend>
            <div class="checkbox-group">
              <label for="typescript">TypeScript</label>
              <input id="typescript" type="checkbox" formControlName="typeScript" />

              <label for="javascript">JavaScript</label>
              <input id="javascript" type="checkbox" formControlName="javaScript" />

              <label for="java">Java</label>
              <input id="java" type="checkbox" formControlName="java" />

              <label for="csharp">C#</label>
              <input id="csharp" type="checkbox" formControlName="cSharp" />
            </div>
          </fieldset>

          <fieldset class="fieldset">
            <legend>Education Level</legend>
            <div class="radio-group">
              <input id="high-school" type="radio" formControlName="educationLevel" value="highSchool" />
              <label for="high-school">High School Diploma</label>

              <input id="associate" type="radio" formControlName="educationLevel" value="associateDegree" />
              <label for="associate">Associate's Degree</label>

              <input id="bachelor" type="radio" formControlName="educationLevel" value="bachelorDegree" />
              <label for="bachelor">Bachelor's Degree</label>

              <input id="master" type="radio" formControlName="educationLevel" value="masterDegree" />
              <label for="master">Master's Degree</label>
            </div>
          </fieldset>
        </form>

        <ngx-extended-pdf-viewer
          slot="end"
          src="/assets/pdfs/OoPdfFormExample.pdf"
          zoom="auto"
          [textLayer]="true"
          [formData]="formData"
          (formDataChange)="setFormData($event)"
          [showPresentationModeButton]="true"
          pvsSetMinifiedLibraryUsage
        />
      </pvs-split-view>
    </ng-template>
  </pvs-content-page>`,
})
export class DisplayingFormsPageComponent {
  private formBuilder = inject(FormBuilder);
  protected readonly countries = countries;

  formData: FormDataType = {};

  pdfForm = this.formBuilder.group({
    firstName: 'Lucía',
    lastName: 'Garzas',
    country: 'Spain',
    jobExperience: '6',
    typeScript: 'Yes',
    javaScript: 'No',
    java: true,
    cSharp: true,
    databases: [['oracle', 'db2', 'sqlServer']],
    educationLevel: 'bachelorDegree',
    otherJobExperience: 'Several\nOther\nJobs',
  });

  constructor() {
    this.pdfForm.valueChanges.pipe(startWith(this.pdfForm.value), takeUntilDestroyed()).subscribe((data) => {
      this.formData = data;
    });
  }

  setFormData(formData: FormDataType) {
    console.log(formData);
    this.pdfForm.patchValue({ ...formData });
  }
}
