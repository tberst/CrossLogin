using System.Threading.Tasks;

using Microsoft.AspNetCore.SignalR;

namespace crosslogin.api
{
    public class ChatHub : Hub<ICrossLoginClient>
    {
        
        public override Task OnConnectedAsync()
        {
            string toto = this.Context.ConnectionId;
            return base.OnConnectedAsync();
        }
        public async Task SendCrossLogin(LoginMessage message)
        {
            string connectionId = message.TargetId;
            await Clients.Clients(connectionId).ReceiveCrossLogin(message);
        }
    }
}