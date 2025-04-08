const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const deepseekService = require('./services/deepseek');

const app = express();

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 花束推荐数据
const flowerRecommendations = {
    '生日': {
        mainFlowers: ['玫瑰', '百合', '康乃馨'],
        accompaniments: ['满天星', '尤加利叶'],
        meanings: {
            eastern: '在东方文化中，玫瑰象征着爱情与美好，百合代表纯洁与祝福，康乃馨传达着母爱与感恩。',
            western: 'In Western culture, roses represent love and passion, lilies symbolize purity and rebirth, while carnations express love and gratitude.'
        }
    },
    '求婚': {
        mainFlowers: ['红玫瑰', '白玫瑰', '香槟玫瑰'],
        accompaniments: ['满天星', '尤加利叶', '银叶菊'],
        meanings: {
            eastern: '在东方文化中，玫瑰象征着真挚的爱情，不同颜色的搭配寓意着永恒的承诺。',
            western: 'In Western tradition, roses are the ultimate symbol of romantic love, with red roses specifically representing deep passion and commitment.'
        }
    },
    // ... 其他场合的花束推荐
};

// API 路由
// 1. 获取花束推荐
app.post('/api/flower-recommendation', async (req, res) => {
    const { occasion, relationship, specialRequest } = req.body;
    
    try {
        const recommendation = await deepseekService.generateFlowerRecommendation(
            occasion, 
            relationship, 
            specialRequest
        );

        res.json({
            success: true,
            data: recommendation
        });
    } catch (error) {
        console.error('获取推荐失败:', error);
        res.status(500).json({
            success: false,
            error: '获取推荐失败'
        });
    }
});

// 2. 生成祝福语
app.post('/api/generate-message', async (req, res) => {
    const { occasion, relationship, style } = req.body;
    
    try {
        const message = await deepseekService.generateBlessing(
            occasion,
            relationship,
            style
        );

        res.json({
            success: true,
            data: message
        });
    } catch (error) {
        console.error('生成祝福语失败:', error);
        res.status(500).json({
            success: false,
            error: '生成祝福语失败'
        });
    }
});

// 3. 生成花束描述
app.post('/api/generate-description', async (req, res) => {
    const { flowers, occasion } = req.body;
    
    try {
        const description = await deepseekService.generateFlowerDescription(
            flowers,
            occasion
        );

        res.json({
            success: true,
            data: description
        });
    } catch (error) {
        console.error('生成描述失败:', error);
        res.status(500).json({
            success: false,
            error: '生成描述失败'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
}); 