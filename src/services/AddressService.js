const { Service } = require('sonorpc');

class AddressService extends Service {

    async addProvince({ provinceName, provinceCode }) {
        const res = await this.app.mysql.insert('province', {
            name: provinceName,
            areaCode: provinceCode
        });
        return { success: true, code: 0, id: res.insertId };
    }

    async addCity({ cityName, cityCode, provinceId, provinceCode }) {
        const res = await this.app.mysql.insert('city', {
            name: cityName,
            areaCode: cityCode,
            provinceId,
            provinceCode
        });
        return { success: true, code: 0, id: res.insertId };
    }

    async addDistrict({ districtName, districtCode, cityId, cityCode }) {
        const res = await this.app.mysql.insert('district', {
            name: districtName,
            areaCode: districtCode,
            cityId,
            cityCode
        });
        return { success: true, code: 0, id: res.insertId };
    }

    async getProvinces() {
        const rows = await this.app.mysql.query('select id,name,areaCode from province');
        return { success: true, code: 0, data: rows };
    }

    async getCitiesByProvinceId(provinceId) {
        const rows = await this.app.mysql.query('select id,name,areaCode,initial from city where provinceId=@p0', [provinceId]);
        return { success: true, code: 0, data: rows };
    }

    async getCitiesByProvinceCode(provinceCode) {
        const rows = await this.app.mysql.query('select id,name,areaCode,initial from city where provinceCode=@p0', [provinceCode]);
        return { success: true, code: 0, data: rows };
    }

    async getDistrictsByCityId(cityId) {
        const rows = await this.app.mysql.query('select id,name,areaCode from district where cityId=@p0', [cityId]);
        return { success: true, code: 0, data: rows };
    }

    async getDistrictsByCityCode(cityCode) {
        const rows = await this.app.mysql.query('select id,name,areaCode from district where cityCode=@p0', [cityCode]);
        return { success: true, code: 0, data: rows };
    }

    async listAreaInfoByDistrictCodes(districtCodes) {
        if (!Array.isArray(districtCodes) || !districtCodes.length) {
            return { success: true, code: 0, data: [] };
        }

        const params = districtCodes.map((code, i) => `@p${i}`);
        const rows = await this.app.mysql.query(`select 
            a.id,a.name as districtName,a.areaCode as districtCode,a.cityCode,
            b.name as cityName,
            c.areaCode as provinceCode,c.name as provinceName
                from district a 
                join city b on a.cityCode=b.areaCode
                join province c on b.provinceCode=c.areaCode
            where a.areaCode in (${params})
        `, districtCodes);
        return { success: true, code: 0, data: rows };
    }

    async getAreaInfoByDistrictCode(districtCode) {
        const rows = await this.app.mysql.query(
            `select 
            a.id,a.name as districtName,a.areaCode as districtCode,a.cityCode,
            b.name as cityName,
            c.areaCode as provinceCode,c.name as provinceName
                from district a 
                join city b on a.cityCode=b.areaCode
                join province c on b.provinceCode=c.areaCode
            where a.areaCode=@p0
        `, [districtCode]
        );
        return { success: true, code: 0, data: rows[0] };
    }
}

module.exports = AddressService;