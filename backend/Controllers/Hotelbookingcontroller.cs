using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using System.Text.Json;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Hotelbookingcontroller : ControllerBase
    {
        private readonly List<Hotelbooking> _hotels;

        // Constructor to load JSON data
        public Hotelbookingcontroller()
        {
            try
            {
                var jsonPath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "hotels.json");
                Console.WriteLine($"Loading JSON from: {jsonPath}");

                if (!System.IO.File.Exists(jsonPath))
                {
                    Console.WriteLine("Error: hotels.json file not found.");
                    _hotels = new List<Hotelbooking>();
                    return;
                }

                var jsonData = System.IO.File.ReadAllText(jsonPath);

                if (string.IsNullOrWhiteSpace(jsonData))
                {
                    Console.WriteLine("Error: hotels.json file is empty.");
                    _hotels = new List<Hotelbooking>();
                    return;
                }

                _hotels = JsonSerializer.Deserialize<List<Hotelbooking>>(jsonData) ?? new List<Hotelbooking>();
                Console.WriteLine($"Successfully loaded {_hotels.Count} hotels.");
                foreach (var hotel in _hotels)
                {
                    Console.WriteLine($"Hotel: {hotel.Id}, {hotel.Name}, {hotel.Location}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading hotels.json: {ex.Message}");
                _hotels = new List<Hotelbooking>();
            }
        }


        // GET: api/hotelbooking
        [HttpGet]
        public ActionResult<IEnumerable<Hotelbooking>> GetHotels()
        {
            if (_hotels == null || _hotels.Count == 0)
            {
                Console.WriteLine("No hotels available to return.");
            }
            return Ok(_hotels);
        }

        // GET: api/hotelbooking/{id}
        [HttpGet("{id}")]
        public ActionResult<Hotelbooking> GetHotelById(int id)
        {
            Console.WriteLine($"Fetching hotel with ID: {id}");
            var hotel = _hotels.Find(h => h.Id == id);

            if (hotel == null)
            {
                Console.WriteLine($"Hotel with ID {id} not found.");
                return NotFound(new { Message = $"Hotel with ID {id} not found." });
            }

            Console.WriteLine($"Returning hotel: {hotel.Name}");
            return Ok(hotel);
        }
    }
}
