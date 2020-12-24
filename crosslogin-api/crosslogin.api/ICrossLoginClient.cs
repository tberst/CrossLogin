using System.Threading.Tasks;


namespace crosslogin.api
{
    public interface ICrossLoginClient
    {
        Task ReceiveCrossLogin(LoginMessage message);
    }
}