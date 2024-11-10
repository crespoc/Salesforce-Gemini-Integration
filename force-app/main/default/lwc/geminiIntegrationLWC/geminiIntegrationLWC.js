import { LightningElement } from 'lwc';
import makePostRequestGemini from '@salesforce/apex/GeminiCallouts.makePostRequest';

export default class GeminiIntegrationLWC extends LightningElement {
    
    responsePresent = false
    showSpinner = false

    async handleClick() {
        console.log('Hello val>'+this.refs.inputFromUser.value)

        try {
            this.showSpinner = true
            const response = await makePostRequestGemini({inputFromUser: this.refs.inputFromUser.value});
            this.responsePresent = true

            this.handleResponseGemini(response)
        } catch(ex) {
            console.log(ex.message)
        } finally {
            this.showSpinner = false
        }
    }

    handleResponseGemini(resp) {
        let parsedResponse = JSON.parse(resp)
        setTimeout(()=>{
            console.log('Hello val>'+parsedResponse)
            this.refs.textAreaResult.value = parsedResponse.candidates[0].content.parts[0].text
        },1000)
    }
}
