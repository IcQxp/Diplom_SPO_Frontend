export interface User {
    genderCode: string;
    lastname: string;
    firstname: string;
    patronymic: string;
    login: string;
    password: string;
    birthDate: Date;
}

// export interface Student extends User {
//     studentId: number;
//     groupId: number;
//     genderCodeNavigation?: Gender; // Если нужно, можно описать более детально
//     grades?: Grade[]; // Определите интерфейс Grade
//     group?: Group; // Определите интерфейс Group
// }

// export interface Employee extends User {
//     employeeId: number;
//     email: string;
//     telephone: string;
//     roleId: number;
//     documents?: Document[]; // Определите интерфейс Document
//     genderCodeNavigation?: Gender; // Если нужно, можно описать более детально
//     lessons?: Lesson[]; // Определите интерфейс Lesson
//     role?: Role; // Определите интерфейс Role
// }


// interface Criteria {
//     criteria: any; // Если известен более конкретный тип, замените 'any' на соответствующий тип
// }

// interface DocumentEF {
//     documentId: number;
//     documentType: string | null;
//     downloadDate: string; // Если известен более конкретный тип даты, используйте его, например, Date или dayjs.Dayjs
//     employee: string | null; // Если известен более конкретный тип для employee, замените 'string' на соответствующий тип
//     filePath: string;
//     score: number | null; // Если score может быть не только числом, но и null, используйте объединенный тип
//     status: string | null; // Если известен более конкретный тип для status, замените 'string' на соответствующий тип
//     studentId: number;
// }

// interface YourMainInterface {
//     criteria: Criteria | null;
//     documentId: number;
//     documentType: string | null;
//     downloadDate: string;
//     employee: string | null;
//     filePath: string;
//     score: number | null;
//     status: string | null;
//     studentId: number;
// }


import {
    Id,
    Name,
    Description,
    FilePath,
    DateString,
    // TimeString,
    Score,
    Email,
    Telephone,
    Password,
    GenderCode,
    GroupNumber,
    RoleName,
    StatusName,
    BirthDate,
    LessonDate,
    StartTime,
    EndTime,
} from './types';

export interface Criterion {
    criteriaId: Id;
    name: Name;
    description: Description;
    maxScore: number;
    documents?: Document[]; // Если нужно
}

export interface Discipline {
    disciplineId: Id;
    name: Name;
    lessons?: Lesson[]; // Если нужно
}

export interface Document {
    documentId: Id;
    studentId: Id;
    statusId: Id;
    employeeId?: Id;
    filePath: FilePath;
    downloadDate: DateString; 
    documentTypeId?: Id;
    criteriaId?: Id;
    score?: Score;
    criteria?: Criterion;
    documentType?: DocumentType;
    employee?: Employee;
    status: Status;
}

export interface DocumentType {
    documentTypeId: Id;
    name: Name;
    description: Description;
    documents?: Document[]; 
}

export interface Employee {
    employeeId: Id;
    genderCode: GenderCode;
    lastname: Name;
    firstname: Name;
    patronymic: Name;
    birthDate: BirthDate; 
    login: Name;
    password: Password;
    email: Email;
    telephone: Telephone;
    roleId: Id;
    documents?: Document[]; 
    genderCodeNavigation?: Gender;
    lessons?: Lesson[]; 
    role?: Role;
}

export interface Gender {
    genderCode: GenderCode;
    name: Name;
    employees?: Employee[];
    students?: Student[];
}

export interface Grade {
    gradeId: Id;
    studentId: Id;
    lessonId: Id;
    value: number;
    lesson?: Lesson;
    student?: Student;
}

export interface Group {
    groupId: Id;
    groupNumber: GroupNumber;
    lessons?: Lesson[];
    students?: Student[];
}

export interface Lesson {
    lessonId: Id;
    disciplineId: Id;
    groupId: Id;
    lessonTimeId: Id;
    lessonDate: LessonDate;
    employeeId: Id;
    discipline?: Discipline;
    employee?: Employee;
    grades?: Grade[];
    group?: Group;
    lessonTime?: LessonTime;
}

export interface LessonTime {
    lessonTimeId: Id;
    startTime: StartTime; 
    endTime: EndTime; 
    lessons?: Lesson[];
}

export interface Role {
    roleId: Id;
    name: RoleName;
    employees?: Employee[];
}

export interface Status {
    statusId: Id;
    name: StatusName;
    documents?: Document[];
}

export interface Student {
    studentId: Id;
    lastname: Name;
    firstname: Name;
    patronymic: Name;
    genderCode: GenderCode;
    groupId: Id;
    login: Name;
    password: Password;
    birthDate: BirthDate; 
    genderCodeNavigation?: Gender;
    grades?: Grade[];
    group?: Group;
}

export function convert(input: any): any {
    const { keys, data } = input;

    // 1. Создаем массив ключей (критериев)
    const criteriaKeys = data.map((item: any) => item.criteria);

    // 2. Преобразуем данные для каждого студента
    const transformedData = keys.map((studentKey: string) => {
        const studentData: any = {
            criteria: studentKey // Ключ - это имя студента
        };

        // Для каждого критерия добавляем значение для текущего студента
        data.forEach((criteriaItem: any) => {
            const criterion = criteriaItem.criteria;
            const value = criteriaItem[studentKey];
            studentData[criterion] = value;
        });

        return studentData;
    });

    // 3. Формируем итоговый объект
    const result = {
        keys: criteriaKeys,
        data: transformedData
    };

    return result;
}