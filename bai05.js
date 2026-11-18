
const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function main() {
    try {
        // Ket noi MongoDB
        await client.connect();
        console.log('Ket noi MongoDB thanh cong!');

        // Chon database va collection
        const db = client.db('qlsinhvien');
        const students = db.collection('students');

        // 1. Tim sinh vien co diem >= 7
        console.log('\nDANH SACH SINH VIEN CO DIEM >= 7:');

        const danhSach = await students
            .find({ diem: { $gte: 7 } })
            .sort({ diem: -1 })
            .toArray();

        console.log(danhSach);

        // 2. Cap nhat diem sinh vien theo masv
        const ketQuaCapNhat = await students.updateOne(
            { masv: 'SV001' },
            { $set: { diem: 9.5 } }
        );

        if (ketQuaCapNhat.matchedCount > 0) {
            console.log('\nCap nhat diem SV001 thanh cong!');
            console.log('So ban ghi duoc cap nhat:', ketQuaCapNhat.modifiedCount);
        } else {
            console.log('\nKhong tim thay sinh vien SV001!');
        }

        // 3. Hien thi thong tin sau cap nhat
        console.log('\nTHONG TIN SINH VIEN SAU KHI CAP NHAT:');

        const sinhVien = await students.findOne({ masv: 'SV001' });
        console.log(sinhVien);

    } catch (error) {
        console.error('Loi:', error);
    } finally {
        // Dong ket noi MongoDB
        await client.close();
        console.log('\nDa dong ket noi MongoDB.');
    }
}

main();
