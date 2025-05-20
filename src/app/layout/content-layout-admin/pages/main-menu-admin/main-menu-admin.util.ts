import { animate, style, transition, trigger } from '@angular/animations';

export interface NavbarData {
  routeLink?: string | '';
  icon?: string;
  label?: string;
  labelar?: string;
  expanded?: boolean;
  id?: string;
  idhash?: string;
  char?: string;
  items?: NavbarData[];
}

export const navbarData: NavbarData[] = [

  {
    label: 'Customers',
    labelar: 'العملاء',
    id: 'customers',
    icon: 'group',
    routeLink:'customers'
   
  },
  {
    label: 'Questions',
    labelar: ' الأسئلة',
    id: 'questions',
    icon: 'question_mark',
    routeLink: "questions"
  },
  {
    label: 'Answers',
    labelar: ' الإجابات',
    id: 'answers',
    icon: 'question_answer',
    routeLink: "answers"
  },
  {
    label: 'Options',
    labelar: 'الخيارات',
    id: 'options',
    icon: 'storage',
    routeLink: "options"
  },
   {
    label: 'Customers Answers',
    labelar: 'إجابات العملاء',
    id: 'customers_answers',
    icon: 'comment',
    routeLink: "customers-answers"
  },
  

];
