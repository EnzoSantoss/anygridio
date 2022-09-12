export interface Ticket {
    id: string;
    protocol?: any;
    type?: number;
    subject: string;
    category: string;
    urgency?: any;
    status: string;
    baseStatus: string;
    justification?: string;
    origin?: number;
    createdDate: Date;
    isDeleted?: boolean;
    originEmailAccount?: any;
    owner: Ticket.Owner;
    ownerTeam?: string;
    createdBy?: Ticket.CreatedBy;
    serviceFull?: string[];
    serviceFirstLevelId?: number;
    serviceFirstLevel?: string;
    serviceSecondLevel?: string;
    serviceThirdLevel?: any;
    contactForm?: any;
    tags?: string[];
    cc?: string;
    resolvedIn?: any;
    closedIn?: any;
    canceledIn?: any;
    actionCount?: number;
    lifeTimeWorkingTime?: any;
    stoppedTime?: any;
    stoppedTimeWorkingTime?: any;
    resolvedInFirstCall?: boolean;
    chatWidget?: any;
    chatGroup?: any;
    chatTalkTime?: any;
    chatWaitingTime?: any;
    sequence?: any;
    slaAgreement?: any;
    slaAgreementRule?: any;
    slaSolutionTime?: number;
    slaResponseTime?: number;
    slaSolutionChangedByUser?: boolean;
    slaSolutionChangedBy?: Ticket.SlaSolutionChangedBy;
    slaSolutionDate?: any;
    slaSolutionDateIsPaused?: boolean;
    jiraIssueKey?: any;
    redmineIssueId?: any;
    movideskTicketNumber?: any;
    linkedToIntegratedTicketNumber?: any;
    reopenedIn?: any;
    lastActionDate?: Date;
    lastUpdate?: Date;
    slaResponseDate?: any;
    slaRealResponseDate?: any;
    clients: Ticket.Client[];
    actions?: Ticket.Action[];
    parentTickets?: any[];
    childrenTickets?: any[];
    ownerHistories?: Ticket.OwnerHistory[];
    statusHistories?: Ticket.StatusHistory[];
    satisfactionSurveyResponses?: any[];
    customFieldValues: Ticket.CustomFieldValue[];
    assets?: any[];
    webhookEvents?: any;
}

module Ticket {

    export interface CreatedBy {
        id: string;
        personType: number;
        profileType: number;
        businessName: string;
        email: string;
        phone: string;
    }

    export interface SlaSolutionChangedBy {
        id: string;
        personType: number;
        profileType: number;
        businessName: string;
        email: string;
        phone: string;
    }

    export interface Organization {
        id: string;
        personType: number;
        profileType: number;
        businessName: string;
        email?: string;
        phone?: string;
    }

    export interface Client {
        id: string;
        personType: number;
        profileType: number;
        businessName: string;
        email: string;
        phone: string;
        isDeleted: boolean;
        organization: Organization;
        address?: string;
        complement?: string;
        cep?: string;
        city?: string;
        bairro?: string;
        number?: string;
        reference?: string;
    }

    export interface Attachment {
        fileName: string;
        path: string;
        createdBy: CreatedBy;
        createdDate: Date;
    }

    export interface Action {
        id: number;
        type: number;
        origin: number;
        description: string;
        htmlDescription: string;
        status: string;
        justification: string;
        createdDate: Date;
        createdBy: CreatedBy;
        isDeleted: boolean;
        timeAppointments: any[];
        attachments: Attachment[];
        expenses: any[];
        tags: string[];
    }

    export interface Owner {
        id: string;
        personType: number;
        profileType: number;
        businessName: string;
        email: string;
        phone: string;
    }

    export interface ChangedBy {
        id: string;
        personType: number;
        profileType: number;
        businessName: string;
        email: string;
        phone: string;
    }

    export interface OwnerHistory {
        ownerTeam: string;
        owner: Owner;
        changedBy: ChangedBy;
        changedDate: Date;
        permanencyTimeFullTime?: number;
        permanencyTimeWorkingTime?: number;
    }

    export interface StatusHistory {
        status: string;
        justification: string;
        changedBy: ChangedBy;
        changedDate: Date;
        permanencyTimeFullTime?: number;
        permanencyTimeWorkingTime?: number;
    }

    export interface Item {
        personId?: any;
        clientId?: any;
        team?: any;
        customFieldItem: string;
        storageFileGuid: string;
        fileName?: any;
    }

    export interface CustomFieldValue {
        customFieldId: number;
        customFieldRuleId: number;
        line: number;
        value: string;
        items: Item[];
    }
}


