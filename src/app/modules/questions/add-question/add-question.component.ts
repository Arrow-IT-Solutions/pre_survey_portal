import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/layout.service';
import { OptionResponse, OptionSearchRequest } from '../../options/options.module';
import { OptionService } from 'src/app/layout/service/option.service';
import { QuestionRequest } from '../questions.module';
import { FormResponse, FormSearchRequest } from '../../form/form.module';
import { FormService } from 'src/app/layout/service/form.service';
import { AddOptionComponent } from '../../options/add-option/add-option.component';
import { QuestionService } from 'src/app/layout/service/question.service';
import { TranslateService } from '@ngx-translate/core';
import { OptionRequest, OptionTranslationRequest } from '../../options/options.module';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
  providers: [MessageService]
})
export class AddQuestionComponent {

  dataForm!: FormGroup;
  submitted: boolean = false;
  btnLoading: boolean = false;
  loading: boolean = false;
  forms: FormResponse[] = [];
  selectedFrom: string[] = [];
  dropdownForm: boolean = false;
  options: OptionResponse[] = [];
  formSelectionError: boolean = false;
  optionSelectionError: boolean = false;
  selectedOption: OptionResponse[] = [];
  dropdownOptions: boolean = false;
  searchTerm: string = '';

  constructor(public formBuilder: FormBuilder,
    public router: Router,
    public optionService: OptionService,
    public layoutService: LayoutService,
    public messageService: MessageService,
    public formService: FormService,
    public questionService: QuestionService,
    public translate: TranslateService
  ) {
    this.dataForm = this.formBuilder.group({
      questionAr: ['', Validators.required],
      questionEn: ['', Validators.required],
      form: [''],
      search_option: [''],
      search_form: [''],
      optionAr: [''],
      optionEn: [''],
      options: this.formBuilder.array([])
    })
  }

  get form(): { [key: string]: AbstractControl } {
    return this.dataForm.controls;
  }

  get optionsArray(): FormArray {
    return this.dataForm.get('options') as FormArray;
  }



  async ngOnInit() {
    try {
      this.loading = true;

      await this.RetriveOption();
      await this.RetriveForm();

      this.optionService.refreshOptions$.subscribe(() => {
        this.RetriveOption();
      });

    } catch (exceptionVar) {
      console.log(exceptionVar);
    } finally {
      this.loading = false;
    }
  }


  async onSubmit() {
    try {
      this.btnLoading = true;
      this.formSelectionError = false;
      this.optionSelectionError = false;

      if (this.dataForm.invalid) {
        this.submitted = true;
        return;
      }

      if (this.selectedFrom.length === 0) {
        this.formSelectionError = true;
        return;
      }
      if (this.selectedOption.length === 0) {
        this.optionSelectionError = true;
        return;
      }

      await this.Save();
    } catch (exceptionVar) {
    } finally {
      this.btnLoading = false;
    }
  }

  async Save() {

    let response;

    var questionTranslations = [
      {
        questionText: this.dataForm.controls['questionAr'].value == null ? '' : this.dataForm.controls['questionAr'].value.toString(),
        language: 'ar'
      },
      {
        questionText: this.dataForm.controls['questionEn'].value == null ? '' : this.dataForm.controls['questionEn'].value.toString(),
        language: 'en'
      }
    ];

    const formUUIDs = this.selectedFrom
      .map(name => {
        const form = this.forms.find(f =>
          f.formTranslations?.[this.layoutService.config.lang]?.name?.trim() === name
        );
        return form?.uuid;
      })
      .filter(uuid => !!uuid);

    const optionRequests: OptionRequest[] = (this.optionsArray.controls as FormGroup[])
      .map((grp, idx) => {
        const formVal = grp.value;        // { optionEn: '...', optionAr: '...' }
        const orig = this.selectedOption[idx];

        // turn the two fields back into the shape your API wants:
        const translations: OptionTranslationRequest[] = [
          {
            uuid: orig.optionTranslation!['en']?.uuid,
            language: 'en',
            name: formVal.optionEn
          },
          {
            uuid: orig.optionTranslation!['ar']?.uuid,
            language: 'ar',
            name: formVal.optionAr
          }
        ].filter(t => !!t.name);

        return {
          uuid: orig.uuid,
          optionTranslation: translations
        };
      });

    if (this.questionService.SelectedData != null) {
      // update
      // var updateQuestion: QuestionUpdateRequest = {
      //   uuid: this.questionService.SelectedData?.uuid?.toString(),
      //   questionTranslation: questionTranslation
      // };
      // console.log(updateQuestion)
      // response = await this.questionService.Update(updateQuestion);
    } else {
      // add
      var addQuestion: QuestionRequest = {
        questionTranslations: questionTranslations,
        formUUIDs: formUUIDs as string[],
        optionRequest: optionRequests,
      };

      response = await this.questionService.Add(addQuestion);
    }

    if (response?.requestStatus?.toString() == '200') {
      this.layoutService.showSuccess(this.messageService, 'toast', true, response?.requestMessage);
      if (this.questionService.SelectedData == null) {
        this.resetForm();
        setTimeout(() => {
          this.questionService.Dialog.adHostChild.viewContainerRef.clear();
          this.questionService.Dialog.adHostDynamic.viewContainerRef.clear();
          this.questionService.triggerRefreshQuestions();
        }, 600);
      } else {
        setTimeout(() => {
          this.questionService.Dialog.adHostChild.viewContainerRef.clear();
          this.questionService.Dialog.adHostDynamic.viewContainerRef.clear();
          this.questionService.triggerRefreshQuestions();
        }, 600);
      }
    } else {
      this.layoutService.showError(this.messageService, 'toast', true, response?.requestMessage);
    }

    this.btnLoading = false;
    this.submitted = false;
  }

  resetForm() {
    this.dataForm.reset();
    this.selectedFrom = [];
    this.selectedOption = [];
  }

  removeForm(option: string) {
    const index = this.selectedFrom.indexOf(option);
    if (index !== -1) {
      this.selectedFrom.splice(index, 1);
    }
  }

  toggleDropdownOption() {
    this.dropdownOptions = !this.dropdownOptions;
  }

  toggleSelectionOption(option: OptionResponse | undefined) {
    if (!option) return;

    // find by uuid
    const idx = this.selectedOption.findIndex(o => o.uuid === option.uuid);

    if (idx === -1) {
      // ─── not in selectedOption → add it ───
      this.selectedOption.push(option);

      // if you’re using a FormArray to power the grid, also add a new group:
      this.optionsArray.push(this.formBuilder.group({
        optionEn: [option.optionTranslation!['en']?.name],
        optionAr: [option.optionTranslation!['ar']?.name]
      }));
    } else {
      // ─── already selected → remove it ───
      this.selectedOption.splice(idx, 1);

      // keep the FormArray in sync
      this.optionsArray.removeAt(idx);
    }
  }


  isSelectedOption(option: OptionResponse): boolean {
    return this.selectedOption.indexOf(option) !== -1;
  }

  toggleDropdownForm() {
    this.dropdownForm = !this.dropdownForm;
  }

  toggleSelectionForm(option: string | undefined) {
    if (!option) return;
    const index = this.selectedFrom.indexOf(option);
    if (index === -1) {
      this.selectedFrom.push(option);
    } else {
      this.selectedFrom.splice(index, 1);
    }
  }

  isSelectedFrom(option: string): boolean {
    return this.selectedFrom.indexOf(option) !== -1;
  }

  removeOption(option: OptionResponse) {
    const idx = this.selectedOption.findIndex(o => o === option);
    if (idx > -1) {
      this.selectedOption.splice(idx, 1);
      this.optionsArray.removeAt(idx);
    }
  }

  async RetriveOption() {

    var optionID: any;

    let filter: OptionSearchRequest = {

      name: '',
      uuid: optionID,
      pageIndex: "",
      pageSize: '100000'

    }
    const response = await this.optionService.Search(filter) as any

    this.options = response.data,

      await this.ReWriteOption();

  }

  async RetriveForm() {

    var formID: any;

    let filter: FormSearchRequest = {

      name: '',
      uuid: formID,
      pageIndex: "",
      pageSize: '100000'

    }
    const response = await this.formService.Search(filter) as any

    this.forms = response.data,

      await this.ReWriteForm();

  }

  ReWriteOption(): any {

    var optionDTO: any[] = []

    this.options.map(option => {
      const translation = option.optionTranslation?.[this.layoutService.config.lang] as any;
      const optionName = translation?.name;

      var obj =
      {
        ...option,
        name: `${optionName}`.trim()

      }

      optionDTO.push(obj)

    })

    this.options = optionDTO;


  }

  ReWriteForm(): any {

    var formDTO: any[] = []

    this.forms.map(form => {
      const translation = form.formTranslations?.[this.layoutService.config.lang] as any;
      const formName = translation?.name;

      var obj =
      {
        ...form,
        name: `${formName}`.trim()

      }

      formDTO.push(obj)

    })

    this.forms = formDTO;

  }

  async FillOption(event: any = null) {
    let filterInput = '';
    if (event && event.target) {
      filterInput = event.target.value;
    }

    let filter: OptionSearchRequest = {

      name: filterInput,
      uuid: '',
      pageIndex: "",
      pageSize: '100000'
    }
    const response = await this.optionService.Search(filter) as any

    this.options = response.data
    await this.ReWriteOption();

  }

  async FillForm(event: any = null) {
    let filterInput = '';
    if (event && event.target) {
      filterInput = event.target.value;
    }

    let filter: FormSearchRequest = {

      name: filterInput,
      uuid: '',
      pageIndex: "",
      pageSize: '100000'
    }
    const response = await this.formService.Search(filter) as any
    this.forms = response.data
    await this.ReWriteForm();

  }

  openAddOptionDialog(value: string) {
    const lang = this.layoutService.config.lang;

    const newOption: OptionResponse = {
      uuid: '',
      optionTranslation: {
        en: {
          uuid: '',
          language: 'en',
          name: lang === 'en' ? value : ''
        },
        ar: {
          uuid: '',
          language: 'ar',
          name: lang === 'ar' ? value : ''
        }
      }
    }

    const exists = this.selectedOption.some(opt =>
      opt.optionTranslation?.[lang]?.name === value
    );
    if (exists) {
      return;
    }

    this.selectedOption.push(newOption);

    this.optionsArray.push(this.formBuilder.group({
      optionEn: [newOption.optionTranslation!['en']!.name],
      optionAr: [newOption.optionTranslation!['ar']!.name]
    }));
  }

  editOption(selectedName: string) {
    // const option = this.options.find(opt => opt.optionTranslation![this.layoutService.config.lang]?.name === selectedName);
    // if (!option) return;

    // const prefillValue = {
    //   optionEn: option.optionTranslation?.['en']?.name || '',
    //   optionAr: option.optionTranslation?.['ar']?.name || '',
    //   uuid: option.uuid
    // };

    // (AddOptionComponent as any).prefillValue = prefillValue;
    // (AddOptionComponent as any).refreshOptionsCallback = async () => {
    //   await this.RetriveOption();

    //   const updatedOption = this.options.find(opt => opt.uuid === option.uuid);
    //   if (updatedOption) {
    //     const newName = updatedOption.optionTranslation?.[this.layoutService.config.lang]?.name;
    //     const idx = this.selectedOption.indexOf(selectedName);
    //     if (idx !== -1 && newName) {
    //       this.selectedOption[idx] = newName;
    //     }
    //   }
    // };

    // const dialogRef = this.layoutService.OpenDialog(AddOptionComponent, 'Update_Option');
    // this.optionService.SelectedData = option;
    // this.optionService.Dialog = dialogRef;
  }



}
