module Ticket {

    interface CreatedBy {
        id: string;
        personType: number;
        profileType: number;
        businessName: string;
        email: string;
        phone: string;
    }

    interface SlaSolutionChangedBy {
        id: string;
        personType: number;
        profileType: number;
        businessName: string;
        email: string;
        phone: string;
    }

    interface Organization {
        id: string;
        personType: number;
        profileType: number;
        businessName: string;
        email?: string;
        phone?: string;
    }

    interface Client {
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

    interface Attachment {
        fileName: string;
        path: string;
        createdBy: CreatedBy;
        createdDate: Date;
    }

    interface Action {
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

    interface Owner {
        id: string;
        personType: number;
        profileType: number;
        businessName: string;
        email: string;
        phone: string;
    }

    interface ChangedBy {
        id: string;
        personType: number;
        profileType: number;
        businessName: string;
        email: string;
        phone: string;
    }

    interface OwnerHistory {
        ownerTeam: string;
        owner: Owner;
        changedBy: ChangedBy;
        changedDate: Date;
        permanencyTimeFullTime?: number;
        permanencyTimeWorkingTime?: number;
    }

    interface StatusHistory {
        status: string;
        justification: string;
        changedBy: ChangedBy;
        changedDate: Date;
        permanencyTimeFullTime?: number;
        permanencyTimeWorkingTime?: number;
    }

    interface Item {
        personId?: any;
        clientId?: any;
        team?: any;
        customFieldItem: string;
        storageFileGuid: string;
        fileName?: any;
    }

    interface CustomFieldValue {
        customFieldId: number;
        customFieldRuleId: number;
        line: number;
        value: string;
        items: Item[];
    }

    export interface ticketData {
        id: string;
        protocol?: any;
        type: number;
        subject: string;
        category: string;
        urgency?: any;
        status: string;
        baseStatus: string;
        justification: string;
        origin: number;
        createdDate: Date;
        isDeleted: boolean;
        originEmailAccount?: any;
        owner: Owner;
        ownerTeam: string;
        createdBy: CreatedBy;
        serviceFull: string[];
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
        slaSolutionChangedBy?: SlaSolutionChangedBy;
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
        clients: Client[];
        actions: Action[];
        parentTickets?: any[];
        childrenTickets?: any[];
        ownerHistories?: OwnerHistory[];
        statusHistories?: StatusHistory[];
        satisfactionSurveyResponses?: any[];
        customFieldValues: CustomFieldValue[];
        assets?: any[];
        webhookEvents?: any;
    }

}
