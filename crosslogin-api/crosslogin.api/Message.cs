namespace crosslogin.api
{
    public class LoginMessage
    {
        public string Event { get; set; }

        public string TargetId {get;set;}

        public string Payload { get; set; }
    }
}