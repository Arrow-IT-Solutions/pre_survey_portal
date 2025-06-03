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
    label: 'Users',
    labelar: 'المستخدمين',
    id: 'users',
    icon: 'group',
    items: [
      {
        label: 'Customers',
        labelar: 'العملاء',
        id: 'customers',
        routeLink: 'customers'
      },
      {
        label: 'Employees',
        labelar: 'الموظفين',
        id: 'employees',
        routeLink: 'employees'
      }
    ]
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
    icon: 'question_answer',
    routeLink: "customers-answers"
  },
  {
    label: 'Forms',
    labelar: 'النماذج',
    id: 'forms',
    icon: ' format_align_justify',
    routeLink: "forms"
  },
  {
    label: 'Feedback',
    labelar: 'التعليقات',
    id: 'feedback',
    icon: 'Comment',
    routeLink: "feedback"
  },
    {
    label: 'Country Codes',
    labelar: 'رموز الدول',
    id: 'country-code',
    icon: 'public',
    routeLink: "country-code"
  }



];
