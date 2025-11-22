document.addEventListener('DOMContentLoaded', () => {
    const eyeGrid = document.querySelector('.eye-grid');
    const cols = 8; // Jumlah kolom mata
    const rows = 8; // Jumlah baris mata
    const eyes = [];

    // 1. Buat elemen mata (Eye) secara dinamis
    for (let i = 0; i < rows * cols; i++) {
        const eye = document.createElement('div');
        eye.classList.add('eye');

        const pupil = document.createElement('div');
        pupil.classList.add('pupil');

        eye.appendChild(pupil);
        eyeGrid.appendChild(eye);
        eyes.push(eye); // Simpan referensi ke semua elemen mata
    }

    // 2. Tambahkan event listener untuk pergerakan kursor
    document.addEventListener('mousemove', (e) => {
        // e.clientX dan e.clientY adalah koordinat kursor
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        eyes.forEach(eye => {
            const pupil = eye.querySelector('.pupil');
            
            // Dapatkan posisi tengah (koordinat) dari setiap bola mata
            const rect = eye.getBoundingClientRect();
            const eyeCenterX = rect.left + rect.width / 2;
            const eyeCenterY = rect.top + rect.height / 2;

            // Hitung perbedaan posisi (delta) antara mouse dan pusat mata
            const deltaX = mouseX - eyeCenterX;
            const deltaY = mouseY - eyeCenterY;

            // Gunakan fungsi atan2 untuk mendapatkan sudut dalam radian
            // atan2(y, x) memberikan sudut yang benar dari sumbu x positif
            const angle = Math.atan2(deltaY, deltaX);

            // Batasi jarak pergerakan pupil (misalnya 10px dari pusat)
            // Pupil hanya bergerak dalam radius ini, yang membatasi pergerakan di dalam bola mata
            const maxDistance = (eye.offsetWidth / 2) - (pupil.offsetWidth / 2) - 5; // Batasi sedikit agar tidak menyentuh tepi
            const distance = Math.min(maxDistance, maxDistance); // Biarkan tetap di batas maksimum

            // Hitung posisi baru pupil menggunakan trigonometri (cos dan sin)
            const pupilX = distance * Math.cos(angle);
            const pupilY = distance * Math.sin(angle);

            // Terapkan pergerakan menggunakan transform: translate
            pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
        });
    });
});