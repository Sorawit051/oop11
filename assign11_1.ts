abstract class TravelPackage {
  private _packageId: string;
  private _packageName: string;
  protected _basePrice: number;

  constructor(packageId: string, packageName: string, basePrice: number) {
    this._packageId = packageId;
    this._packageName = packageName;
    this._basePrice = basePrice;
  }

  public get packageId(): string {
    return this._packageId;
  }

  public get packageName(): string {
    return this._packageName;
  }

  public get basePrice(): number {
    return this._basePrice;
  }

  abstract calculatePrice(people: number): number;
  abstract getDetails(): string;
}

class OneDayTrip extends TravelPackage {
  constructor(packageId: string, packageName: string, basePrice: number) {
    super(packageId, packageName, basePrice);
  }

  calculatePrice(people: number): number {
    let total = this._basePrice * people;
    if (people >= 5) {
      total *= 0.9;
    }
    return total;
  }

  getDetails(): string {
    return `${this.packageName} (One-Day)\nPrice: ${this.basePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} Baht`;
  }
}

class OvernightTrip extends TravelPackage {
  private _numberOfNights: number;

  constructor(packageId: string, packageName: string, basePrice: number, numberOfNights: number) {
    super(packageId, packageName, basePrice);
    this._numberOfNights = numberOfNights;
  }

  public get numberOfNights(): number {
    return this._numberOfNights;
  }

  calculatePrice(people: number): number {
    let total = this._basePrice * people * this._numberOfNights;
    if (this._numberOfNights >= 3) {
      total *= 0.85;
    }
    return total;
  }

  getDetails(): string {
    return `${this.packageName} (Overnight - ${this._numberOfNights} Nights)\nPrice: ${this.basePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })} Baht`;
  }
}

class Customer {
  private _customerId: string;
  private _name: string;
  private _phone: string;

  constructor(customerId: string, name: string, phone: string) {
    this._customerId = customerId;
    this._name = name;
    this._phone = phone;
  }

  public get customerId(): string {
    return this._customerId;
  }

  public get name(): string {
    return this._name;
  }

  public get phone(): string {
    return this._phone;
  }
}

class BookingDetail {
  private _travelerNames: string[];

  constructor(travelerNames: string[]) {
    this._travelerNames = travelerNames;
  }

  public get travelerNames(): string[] {
    return this._travelerNames;
  }

  public get numberOfTravelers(): number {
    return this._travelerNames.length;
  }
}

class Booking {
  private _bookingId: string;
  private _customer: Customer;
  private _pkg: TravelPackage;
  private _detail: BookingDetail;

  constructor(bookingId: string, customer: Customer, pkg: TravelPackage, travelerNames: string[]) {
    this._bookingId = bookingId;
    this._customer = customer;
    this._pkg = pkg;
    this._detail = new BookingDetail(travelerNames);
  }

  public calculateTotal(): number {
    return this._pkg.calculatePrice(this._detail.numberOfTravelers);
  }

  public displayBookingSummary(): void {
    const count = this._detail.numberOfTravelers;
    const names = this._detail.travelerNames.join(', ');
    const total = this.calculateTotal();
    
    let discountLabel = "";
    if (this._pkg instanceof OneDayTrip && count >= 5) {
      discountLabel = " (10% Disc)";
    } else if (this._pkg instanceof OvernightTrip && this._pkg.numberOfNights >= 3) {
      discountLabel = " (15% Disc)";
    }

    console.log("===== Booking Detail =====");
    console.log(`Booking ID: ${this._bookingId}`);
    console.log(`Customer: ${this._customer.name}`);
    console.log(`Package: ${this._pkg.packageName}`);
    console.log(`Travelers: ${count} (${names})`);
    console.log("-------------------------------");
    console.log(`Total Price${discountLabel}: ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })} Baht`);
  }
}

class TravelAgency {
  private _agencyName: string;
  private _packages: TravelPackage[] = [];

  constructor(agencyName: string) {
    this._agencyName = agencyName;
  }

  public addPackage(pkg: TravelPackage): void {
    this._packages.push(pkg);
  }

  public displayPackages(): void {
    console.log("===== Travel Packages =====");
    this._packages.forEach((pkg, index) => {
      console.log(`${index + 1}. ${pkg.getDetails()}`);
    });
  }
}

const trip1 = new OneDayTrip("P001", "Bangkok City Tour", 1500);
const trip2 = new OvernightTrip("P002", "Chiang Mai Trip", 2500, 3);

const agency = new TravelAgency("Sunset Travel");
agency.addPackage(trip1);
agency.addPackage(trip2);
agency.displayPackages();

console.log();

const customer = new Customer("C001", "Alice", "0812345678");
const travelers = ["Alice", "Bob", "Carol", "David", "Eve"];

const booking = new Booking("B001", customer, trip1, travelers);
booking.displayBookingSummary();