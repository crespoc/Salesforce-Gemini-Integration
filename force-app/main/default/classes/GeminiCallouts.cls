public class GeminiCallouts {
    public static final String apiKey;
    static {
        API_Keys__c CS = API_Keys__c.getOrgDefaults();
        apiKey = CS.API_Key_Value__c;
    }
    @AuraEnabled
    public static String makePostRequest(String inputFromUser) {
        Http http = new Http();
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Gemini_API_NC?key='+apiKey);
        req.setMethod('POST');

        req.setHeader('Content-Type', 'application/json');
        req.setBody(getRequestBodyForGeminiRequest(inputFromUser));

        HTTPResponse res = http.send(req);
        return res.getBody();
    }

    private static String getRequestBodyForGeminiRequest(String inputFromUser) {
        Map<String, Object> finalBody = new Map<String, Object>();
        finalBody.put('contents', new List<Map<String,Object>>());

        //Parts of List & Object
        Map<String,Object> partsObject = new Map<String,Object> {'text'=>inputFromUser};
        List<Map<String,Object>> partsList = new List<Map<String,Object>> {partsObject};

        Map<String,Object> contentListObject = new Map<String,Object> {'parts'=>partsList};

        ((List<Map<String,Object>>)finalBody.get('contents')).add(contentListObject);

        return JSON.serialize(finalBody);

    }
}