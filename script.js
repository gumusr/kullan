// Basit veri: Sülale bilgileri
const familyData = [
    {
        name: "Ahmet Yılmaz",
        birthdate: "1990-01-01",
        birthplace: "İstanbul",
        tc: "12345678901",
        family_info: "Yılmaz ailesi, İstanbul'dan gelir, 3 kuşak önce köylerinden göç etmişler."
    },
    {
        name: "Ayşe Demir",
        birthdate: "1985-03-15",
        birthplace: "Konya",
        tc: "10987654321",
        family_info: "Demir ailesi, Konya'nın merkezinden taşınmışlar."
    },
    {
        name: "Mehmet Kaya",
        birthdate: "1975-05-20",
        birthplace: "Trabzon",
        tc: "10293847561",
        family_info: "Kaya ailesi, Trabzon'dan göç etmiş ve İzmir'e yerleşmiş."
    }
];

// Arama işlemi
function searchFamilyInfo() {
    const name = document.getElementById('nameInput').value.trim();
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('errorMessage');

    // Hata mesajını temizle
    errorDiv.innerHTML = '';

    // Girilen ismi verilerle karşılaştır
    const person = familyData.find(entry => entry.name.toLowerCase() === name.toLowerCase());

    // Kullanıcı IP adresini al
    const userIp = getClientIp();

    // Kullanıcı sorgusunu kaydet
    saveSearchHistory(name, userIp);

    if (person) {
        // Kullanıcı bulunursa bilgileri göster
        resultDiv.innerHTML = `
            <h2>${person.name}</h2>
            <p><strong>Doğum Tarihi:</strong> ${person.birthdate}</p>
            <p><strong>Doğum Yeri:</strong> ${person.birthplace}</p>
            <p><strong>TC Numarası:</strong> ${person.tc}</p>
            <p><strong>Sülale Bilgisi:</strong> ${person.family_info}</p>
        `;
    } else {
        // Eşleşme yoksa
        resultDiv.innerHTML = '<h2>Bilgi bulunamadı.</h2>';
    }
}

// Kullanıcının IP adresini almak için basit bir yöntem
function getClientIp() {
    return (window.RTCPeerConnection) ? 'İç IP' : 'Dış IP'; // Burada gerçek IP almak için API kullanmanız gerekecek
}

// Arama geçmişini kaydet
function saveSearchHistory(name, ip) {
    const logData = `İsim: ${name}, IP: ${ip}, Tarih: ${new Date().toISOString()}\n`;
    const logFile = 'log.txt';
    const blob = new Blob([logData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = logFile;
    link.click();
}
