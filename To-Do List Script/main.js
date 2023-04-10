/* To-Do List Script */

let taskDOM = document.querySelector('#task');
let listDOM = document.querySelector('#list');
let allLiDOM = document.querySelector('li');

// Liste elemanlarını silmek için fonksiyon tanımlandı.

function removeElement(erase) {
    erase.remove(); // liste elemanını sil
    eraseStrorage(erase); // liste elemanının içeriğini localStorage'den sil
}

// Liste elemanlarını işaretlemek için fonksiyon tanımlandı.

function markElement() {
    this.classList.toggle("checked");
}

// Liste kapa tuşu değişkeni için liste elemanı silme eventi kullanıldı.

let closeButton = `<button
onclick="removeElement(parentNode)"
style="padding: 12px;" type="button"
class="close"
data-dismiss="toast"
aria-label="Close">
<span aria-hidden="true">&times;</span>
</button>`

allLiDOM.forEach(s => {
    s.addEventListener("click", markElement);
    s.innerHTML += `${closeButton}`
})

// Liste elemanı için ekleme fonksiyonu tanımlandı.
function newElement() {
    if ( !taskDOM.value || !taskDOM.value.trim() ) {
        console.log("Listeye boş ekleme yapamazsınız!");
        $(".error").toast("show") // 1. toast bildirimi
    }
    else { // Liste için yeni bir li elemanı oluşturuldu.
        let liDOM = document.createElement('li');

        listDOM.append(liDOM); // yeni li elemanı ul (liste) içerisine yerleştirildi.

        console.log(`Listeye ekleme yapıldı, girilen değer: ${taskDOM.value}`)

        // Toast bildirimi: başarılı
        $('.success').toast('show')
        
        // li elemanının içeriğine inputa girilen değer ve kapama tuşu tanımlandı.
        liDOM.innerHTML = `${taskDOM.value}${closeButton}`;

        // li elemanı için işaretleme fonksiyonu eventi tanımlandı.
        liDOM.addEventListener("click", markElement);

        // localStorage.setItem("inputValue", `${taskDOM.value}`);
        setStorage()
    }
    taskDOM.value = ""; // input sıfırlandı.
}

/* 
    Aşağıdaki fonksiyonlar localStorage için tanımlanmıştır. 
*/

// Liste elemanı içeriğini localStorage'ye ekleyen fonksiyon tanımlandı.

function setStorage() {
    let toDo_List = JSON.parse(localStorage.getItem('toDo_List') );
    if (toDo_List.includes(erase.firstChild.textContent) == true) {
        let indexBul = toDo_List.findIndex (s => s.textContent == erase.firstChild.textContent);
        toDo_List.splice(indexBul, 1);
        localStorage.setItem('toDo_List', JSON.stringify(toDo_List) );
    }
}

// Daha önce oluşturulan bir localStorage dosyası yok ise diye oluşturulan fonksiyon.
function localSelf() {
    let toDo_List = JSON.parse(localStorage.getItem('toDo_List') );
    if (!toDo_List) {toDo_List = [0]};
    localStorage.setItem('toDo_List', JSON.stringify(toDo_List) );
}

// Sayfa her yenilendiğinde localStorage'de kayıtlı her elemanı listeye yeniden ekleyen fonksiyon.
function localDOM() {
    let toDo_List = JSON.parse(localStorage.getItem('toDo_List') );
    toDo_List.forEach( (s, index) => {
        let liDOM = document.createElement('li');
        listDOM.append(liDOM);
        liDOM.innerHTML = toDo_List[index]
        liDOM.innerHTML += `${closeButton}`
        liDOM.addEventListener("click", markElement);
    })
}

localSelf() // Yok ise localStorage dosyası oluşturuldu.

localDOM() // localStorage'de daha önce kaydettiğimiz liste elemanları DOM arayüzüne eklendi.