export interface User {
    genderCode: string;
    lastname: string;
    firstname: string;
    patronymic: string;
    login: string;
    password: string;
    birthDate: Date; // или Date, в зависимости от формата
}
export interface Student extends User {
    studentId: number;
    groupId: number;
    genderCodeNavigation?: Gender; // Если нужно, можно описать более детально
    grades?: Grade[]; // Определите интерфейс Grade
    group?: Group; // Определите интерфейс Group
}

export interface Employee extends User {
    employeeId: number;
    email: string;
    telephone: string;
    roleId: number;
    documents?: Document[]; // Определите интерфейс Document
    genderCodeNavigation?: Gender; // Если нужно, можно описать более детально
    lessons?: Lesson[]; // Определите интерфейс Lesson
    role?: Role; // Определите интерфейс Role
}

export interface Grade {
    // Определите поля, если необходимо
}

export interface Group {
    // Определите поля, если необходимо
}

export interface Gender {
    // Определите поля, если необходимо
}

export interface User { 

}

export interface Lesson { 

}

export interface Document { 

}

export interface Role { 

}