import { LightningElement } from 'lwc';

export default class AccountTable extends LightningElement {
    accounts = [
        {id: 1, name: 'Acme Corporation', status: 'Active'},
        {id: 2, name: 'Globex Inc.', status: 'Active'},
    ];

    handleDeactivate(event) {
        const accountId = event.detail;
        this.accounts = this.accounts.map((account) =>
            account.id === accountId ? {...account, status: 'Inactive'} : account
        );
    }

    handleButtonClick(event) {
        const accountId = event.target.dataset.id;
        this.handleDeactivate({ detail: accountId });
    }
}
