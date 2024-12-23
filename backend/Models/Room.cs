using System.Text.Json.Serialization;

namespace WebApplication1.Models
{
    public class Room
    {
        [JsonPropertyName("roomType")]
        public string RoomType { get; set; }

        [JsonPropertyName("amount")]
        public int Amount { get; set; }
    }
}

