function AddressBook() {
    this.contacts = {};
    this.newId = 0;
}

AddressBook.prototype.givenId = function () {
    this.newId++;
    return this.newId;
};

AddressBook.prototype.AddContact = function (contact) {
    contact.Id = this.givenId();
    this.contacts[contact.Id] = contact;
};

AddressBook.prototype.findContact = function (id) {
    if (this.contacts[id] !== undefined) {
        return this.contacts[id];
    }
    return false;
};

AddressBook.prototype.deleteContact = function (id) {
    if (this.contacts[id] === undefined) {
        return false;
    }
    delete this.contacts[id];
    return true;
};
AddressBook.prototype.editContact = function (id) {
    const contact = this.findContact(id);
    if (!contact) {
      return false;
    }
  
    contact.firstName = $(".firstname").val();
    contact.lastName = $(".lastname").val();
    contact.phoneNumber = $(".phonenumber").val();
    contact.emailAddress = $(".emailaddress").val();
    contact.homeAddress = $(".homeaddress").val();
  
    return true;
  };
// Contact BusinessLogic
function Contact(firstname, lastname, phonenumber, emailaddress, homeaddress) {
    this.firstName = firstname;
    this.lastName = lastname;
    this.phoneNumber = phonenumber;
    this.emailAddress = emailaddress;
    this.homeAddress = homeaddress;
}

Contact.prototype.fullName = function () {
    return this.firstName + ' ' + this.lastName;
};

function showContact(contactId) {
    const contact = addressBook.findContact(contactId);
    $(".each").show()
        let buttons = $(".detail");
        buttons.empty();
        buttons.append(`
            <div class='first'>
                <p class='first-name'>${contact.firstName}</p>
                <p class='last-name'>${contact.lastName}</p>
            </div>
            <div class='others'>
                <div class='inothers flex2'>
                    <p class='phone-number'>${contact.phoneNumber}</p>
                    <p class='email-address'>${contact.emailAddress}</p>
                    <p class='home-address'>${contact.homeAddress}</p>
                </div>
            </div>
            <div class='props'>
                <div class='inprops flex'>
                    <div class='icons copy' data-contact-id="${contact.Id}">
                        <img src='img/paste-solid (1).svg'>
                    </div>
                    <div class='icons edit' data-contact-id="${contact.Id}">
                        <img src='img/pen-to-square-solid (1).svg'>
                    </div>
                    <div class='icons delete' data-contact-id="${contact.Id}">
                        <img src='img/trash-can-solid (1).svg'>
                    </div>
                </div>
            </div>
        `);
   
}

function attachContactListeners() {
    $(".each").on("click", "p", function () {
        showContact(this.id);
        $(".detail").slideToggle()
    });

    $(".detail").on("click", ".delete", function () { 
        const contactId = $(this).data("contact-id");
        addressBook.deleteContact(contactId);
        displayContactDetails(addressBook);
        $(".detail").empty(); 
        $(".detail").slideUp()
    });
  
      $(".detail").on("click", ".copy", function () {
        const contactId = $(this).data("contact-id");
        let contact = addressBook.findContact(contactId)
        let ToCopy = contact.firstName + " " + contact.lastName + " " + contact.phoneNumber + " " + contact.emailAddress +" "+ contact.homeAddress
        let textToCopy = ToCopy;
        let tempTextarea = $("<textarea>");
        tempTextarea.val(textToCopy);
        $("body").append(tempTextarea);
        tempTextarea.select();
        document.execCommand("copy");
        $(tempTextarea).remove();
    
      });
      $(".detail").on("click", ".edit", function () {
        const contactId = $(this).data("contact-id");
        let contact = addressBook.findContact(contactId)
        let div = $(".new")
        div.html("<div class='update button' id=" + contactId + ">update</div>")
        $(".firstname").val(contact.firstName);
        $(".lastname").val(contact.lastName);
        $(".phonenumber").val(contact.phoneNumber);
        $(".emailaddress").val(contact.emailAddress);
        $(".homeaddress").val(contact.homeAddress);

        $(".add").fadeOut()
        $(".new").fadeIn()
        $(".wait").slideDown()
        $(".wait2").slideDown()
        $(".wait3").slideDown()
      });
    
      $(".new").on("click", ".update", function () {
        $(".new").fadeOut()
        $(".detail").slideUp()
        $(".add").fadeIn()
        $(".wait").slideUp()
        $(".wait2").slideUp()
        $(".wait3").slideUp()

        $(".firstname").val("");
        $(".lastname").val("");
        $(".phonenumber").val("");
        $(".emailaddress").val("");
        $(".homeaddress").val("");

        addressBook.editContact(this.id);
        displayContactDetails(addressBook);
      });
      $(".name").click(function(){
        $(".wait").slideToggle()
      })
      $(".phone").click(function(){
        $(".wait2").slideToggle()
      })
      $(".home").click(function(){
        $(".wait3").slideToggle()
      })
      
}

let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
    let contactsList = $(".each");
    let htmlForContactInfo = "";
    Object.keys(addressBookToDisplay.contacts).forEach(function (key) {
        const contact = addressBookToDisplay.findContact(key);
        htmlForContactInfo += "<p id=" + contact.Id + ">" + contact.fullName() + "</p>";
    });
    contactsList.html(htmlForContactInfo);
}

$(document).ready(function () {
    attachContactListeners();
    $(".formone").submit(function (event) {
        event.preventDefault();

        $(".each").slideDown();
        $(".wait").slideUp();
        $(".wait2").slideUp();
        $(".wait3").slideUp();

        const inputtedFirstName = $(".firstname").val();
        const inputtedLastName = $(".lastname").val();
        const inputtedPhoneNumber = $(".phonenumber").val();
        const inputtedEmailAddress = $(".emailaddress").val();
        const inputtedHomeAddress = $(".homeaddress").val();

        $(".firstname").val("");
        $(".lastname").val("");
        $(".phonenumber").val("");
        $(".emailaddress").val("");
        $(".homeaddress").val("");

        let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, inputtedHomeAddress);
        addressBook.AddContact(newContact);
        displayContactDetails(addressBook);
    });
});




