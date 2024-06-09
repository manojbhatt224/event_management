import jsonfile from "jsonfile";
import { getEntityLocation } from "../helpers/databaseEntityLocator.js";
import { v4 as uuidv4 } from "uuid";

const keyOrder = [
  "id",
  "title",
  "description",
  "category",
  "totalParticipants",
  "startDate",
  "endDate",
  "location",
];

const eventDAO = {
  getAllEvents() {
    try {
      return jsonfile.readFileSync(getEntityLocation("events"));
    } catch (error) {
      return null;
    }
  },
  searchEventByTitle(title) {
    const keyword = title.toLowerCase();
    const events = this.getAllEvents();
    const searchResults = events.filter((event) =>
      event.title.toLowerCase().includes(keyword)
    );
    return searchResults;
  },
  getEventByDateRange(startDate, endDate) {
    const events = this.getAllEvents();
    const filteredEvents = events.filter((event) => {
      const eventStartDate = new Date(event.startDate);
      const eventEndDate = new Date(event.endDate);
      const filterStartDate = new Date(startDate);
      const filterEndDate = new Date(endDate);
      return eventStartDate >= filterStartDate && eventEndDate <= filterEndDate;
    });
    return filteredEvents;
  },
  getEventByCriteria(criteria) {
    const events = this.getAllEvents();
    const filteredEvents = events.filter((event) => {
      for (const key in criteria) {
        if (event[key].toLowerCase() !== criteria[key].toLowerCase()) {
          return false;
        }
      }
      return true;
    });
    return filteredEvents;
  },
  searchEventsByTitleAndDate(startDate, endDate, titleKeyword) {
    const titleSearchResults = this.searchEventsByTitle(titleKeyword);
    const dateRangeResults = this.filterEventsByDate(startDate, endDate);

    const searchResults = titleSearchResults.filter((event) =>
      dateRangeResults.some((e) => e.id === event.id)
    );

    return searchResults;
  },

  createEvent(newEvent) {
    const sortedEvent = {};
    newEvent.id = uuidv4(); // Generate UUID for new event
    keyOrder.forEach((key) => {
      if (newEvent.hasOwnProperty(key)) {
        sortedEvent[key] = newEvent[key];
      }
    });
    const events = this.getAllEvents();
    events.push(sortedEvent);
    jsonfile.writeFileSync(getEntityLocation("events"), events, { spaces: 4 });
    return sortedEvent;
  },
  deleteEvent(id) {
    const events = this.getAllEvents();
    const index = events.findIndex((event) => event.id === id);
    if (index !== -1) {
      events.splice(index, 1);
      jsonfile.writeFileSync(getEntityLocation("events"), events, {
        spaces: 4,
      });
      return true;
    } else {
      return false;
    }
  },
  updateEvent(id, updateData) {
    const events = this.getAllEvents();
    const index = events.findIndex((event) => event.id === id);
    if (index !== -1) {
      events[index] = { ...events[index], ...updateData };
      jsonfile.writeFileSync(getEntityLocation("events"), events, {
        spaces: 4,
      });
      return true;
    } else {
      return false;
    }
  },
};


export { eventDAO };
